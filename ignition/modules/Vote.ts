import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";

const _ownerAddress = "0xf39fd6e51aad88f6f4ce6ab8827279cfffb92266";
const _candidates = ["Candidate 1", "Candidate 2", "Candidate 3"];

const VoteModule = buildModule("VoteModule", (m) => {
  const ownerAddress = m.getParameter("ownerAddress", _ownerAddress);
  const candidates = m.getParameter("candidates", _candidates);

  const vote = m.contract("Vote", [ownerAddress, candidates]);

  return { vote };
});

export default VoteModule;
