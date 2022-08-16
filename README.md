# Fundchain-Dapp
A decentralized fundraising application using Tezos technology with its own consensus protocol. It can be used to donate and raise funds and also 'conditionally' funds. It also contains its own consensus algorithm (halfway implemented due to time constraint) which is similar to proof-of-stake, which is being designed to verify the fundraising organizations/individuals. These are elaborated in the upcoming sections.
README.md
Fundchain_Dapp
A decentralized fundraising application using Tezos technology with its own consensus protocol. It can be used to donate and raise funds and also 'conditionally' funds. It also contains its own consensus algorithm (halfway implemented due to time constraint) which is similar to proof-of-stake, which is being designed to verify the fundraising organizations/individuals. These are elaborated in the upcoming sections. Fundchain is a decentralized application that directly connects the funders to the needy. The following are the key-words used in our project:

Upvote-Downvote

Each organization has an upvote feature for other users to show support and a downvote feature to report an organization as spam. A little amount of gas fee will used for using this feature.

Conditional Fund

There are two ways in which one can donate to these organizations. One way is to directly send the amount to the organization. But in this case, there is a slight risk factor as the organization may turn out to be a fake one. So to take fake organizations out of the equation the user may opt for conditional funding. In this type of funding, the number of downvotes plays a deciding role for an organization to be fake or genuine. Since marking an organization fake just by a fixed number of downvotes seems unfair, we let the donor fix this number. So the donor is asked the threshold number of downvotes at the time of donating. If the number of downvotes for the organization crosses the downvotes set by the donor, the donor may then choose to reclaim his money back. But the donor must be aware that he/she only gets 80% of the amount donated. The remaining 20% is redistributed to the field workers who spent their money to upvote or downvote the organization.

Claim-Reclaim

When a user donates using the conditional fund feature, the amount is stored in the smart contract until the deadline of the organization is reached. If in between the number of downvotes has crossed the threshold set by the donor, he/she may reclaim their amount(80%). Else after the deadline is reached the organization will claim the amount which the donor has donated.

XP mechanism There are two variants of XP for a user. XP as a Funder XP as a Beneficiary

XP as a Funder

This is a proportional indicator of the amount donated by the user to different organizations. To be precise, a donor gains this type of XP which is equal to 10 times the amount he/she donates through direct funding and 5 times if he/she donates with the help of conditional funding.

XP as a Beneficiary

This represents the reputation of the organization from the number of upvotes/downvotes and the number of goals reached through this organization. To be precise, for each upvote or downvote, the organization gains or loses 5 XP (of this type) respectively. Also, there is one more way to gain XP for an organization, that is through accomplishing the goals set by themselves. If an organization reaches its goal before the deadline, the organization gains one-tenth of the target amount.
