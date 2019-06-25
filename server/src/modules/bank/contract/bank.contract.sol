pragma solidity ^0.5.0;

contract SimpleBank {
    uint8 private clientCount;
    mapping (address => uint) private balances;
    address public owner;

    constructor() public {
        owner = msg.sender;
        clientCount = 0;
    }
    
    event LogDeposit(address indexed accountAddress, uint amount);
    event LogWithdrawal(address indexed accountAddress, uint amount);

    function deposit() public payable returns (uint) {
        balances[msg.sender] += msg.value;
        emit LogDeposit(msg.sender, msg.value);
        return balances[msg.sender];
    }
    
    function withdraw(uint withdrawAmount) internal returns (uint remainingBal) {
        // Check enough balance available, otherwise just return balance
        if (withdrawAmount <= balances[msg.sender]) {
            balances[msg.sender] -= withdrawAmount;
            msg.sender.transfer(withdrawAmount);
            emit LogWithdrawal( msg.sender, withdrawAmount);
        }
        return balances[msg.sender];
    }
    
    function balance() public view returns (uint) {
        return balances[msg.sender];
    }
    
    function balanceOf(address addr) public onlyOwner view returns (uint) {
        return balances[addr];
    }

    /// @return The balance of the Simple Bank contract
    function depositsBalance() public view onlyOwner returns (uint) {
        return address(this).balance;
    }
    
    function getClientCount() public view onlyOwner returns (uint8) {
        return clientCount;
    }
    
    modifier onlyOwner {
        require(
            msg.sender == owner,
            "Only owner can call this function."
        );
        _;
    }
}