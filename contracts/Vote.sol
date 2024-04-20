// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.19;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Pausable.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract Vote is ERC721, ERC721Pausable, Ownable {
    struct Candidate {
        string name;
        uint256 votes;
    }

    uint256 private _nextTokenId = 0;
    Candidate[] candidates;
    mapping(address => bool) public voters;

    event VoteCast(address indexed voter);

    constructor(
        address initialOwner,
        string[] memory _candidates
    ) ERC721("ID VOTES", "ID-V") Ownable(initialOwner) {
        for (uint256 i = 0; i < _candidates.length; i++) {
            candidates.push(Candidate(_candidates[i], 0));
        }
    }

    function hasVote() external view returns (bool) {
        return voters[msg.sender] ? true : false;
    }

    function vote(uint256 candidateId) external {
        // vote validations
        require(owner() != msg.sender, "Owner cannot cast a vote");
        require(candidateId < candidates.length, "No candidate found");
        require(!voters[msg.sender], "You have already vote");

        // mint the vote
        uint256 tokenId = _nextTokenId++;
        _mint(msg.sender, tokenId);

        // increment the votes count
        candidates[candidateId].votes++;

        // flag the user already voted
        voters[msg.sender] = true;

        // emit an event;
        emit VoteCast(msg.sender);
    }

    function votingResult()
        external
        view
        onlyOwner
        returns (Candidate[] memory)
    {
        return candidates;
    }

    function pause() public onlyOwner {
        _pause();
    }

    function unpause() public onlyOwner {
        _unpause();
    }

    // The following functions are overrides required by Solidity.

    function _update(
        address to,
        uint256 tokenId,
        address auth
    ) internal override(ERC721, ERC721Pausable) returns (address) {
        return super._update(to, tokenId, auth);
    }
}
