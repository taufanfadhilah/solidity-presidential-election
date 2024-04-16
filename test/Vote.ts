import { loadFixture } from "@nomicfoundation/hardhat-toolbox/network-helpers";
import { expect } from "chai";
import hre from "hardhat";

/**
 * Test cases:
 * 1. Able to vote a candidate on the list ✅
 * 2. Owner can not cast a vote ✅
 * 3. Can not vote not found candidate ✅
 * 4. Can not do multiple votes ✅
 * 5. Normal user can't see the voting result ✅
 * 6. Only owner who able to see the voting result ✅
 */
const _candidates = ["Candidate 1", "Candidate 2", "Candidate 3"];

describe("Vote", function () {
  // We define a fixture to reuse the same setup in every test.
  // We use loadFixture to run this setup once, snapshot that state,
  // and reset Hardhat Network to that snapshot in every test.
  async function deployVoteFixture() {
    // Contracts are deployed using the first signer/account by default
    const [owner, otherAccount] = await hre.ethers.getSigners();

    const Vote = await hre.ethers.getContractFactory("Vote");
    const vote = await Vote.deploy(owner, _candidates);

    return { vote, owner, otherAccount };
  }

  describe("Deployment", function () {
    it("Able to deploy and check by owner address", async function () {
      const { vote, owner } = await loadFixture(deployVoteFixture);

      expect(await vote.owner()).to.equal(owner.address);
    });

    it("Able to vote a candidat on the list", async () => {
      const { vote, otherAccount } = await loadFixture(deployVoteFixture);
      await vote.connect(otherAccount).vote(0);

      const res = await vote.votingResult();

      expect(res[0][1]).to.equal(1n);
    });

    it("Owner can not cast a vote", async () => {
      const { vote } = await loadFixture(deployVoteFixture);

      await expect(vote.vote(0)).to.be.revertedWith("Owner cannot cast a vote");
    });

    it("Can not vote not found candidate", async () => {
      const { vote, otherAccount } = await loadFixture(deployVoteFixture);

      await expect(
        vote.connect(otherAccount).vote(_candidates.length)
      ).to.be.revertedWith("No candidate found");
    });

    it("Can not do multiple votes", async () => {
      const { vote, otherAccount } = await loadFixture(deployVoteFixture);

      vote.connect(otherAccount).vote(0);

      await expect(vote.connect(otherAccount).vote(1)).to.be.revertedWith(
        "You have already vote"
      );
    });

    it("Normal user can't see the voting result", async () => {
      const { vote, otherAccount } = await loadFixture(deployVoteFixture);

      await expect(vote.connect(otherAccount).votingResult()).to.be.reverted;
    });

    it("Only owner who able to see the voting result", async () => {
      const { vote } = await loadFixture(deployVoteFixture);

      const votingResult = await vote.votingResult();
      votingResult.forEach((voting, index) => {
        expect(voting[0]).to.equal(_candidates[index]);
      });
    });
  });
});
