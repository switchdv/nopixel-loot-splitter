# nopixel-loot-splitter

A website application that helps split the bank heist loot in NoPixel GTA RP server.

## How to calculate

- The splitting is based on the amount of investment, payout, and profit. The basic formula to calculate the profit:

  _profit = payout - investment_

- For _n_-man group, the split would be:<br />

  _cut = profit / n_<br />

  which is also:<br />

  _cut = (payout - investment) / n_

- Because the payout from the bank is usually comprised of bags (inked and marked bills) and cash, it would be:<br />

  _payout = #inked + #marked + #cash + #other_<br />

  which leads us to the final formula for individual cut (ignoring uneven investment per person):

  _cut = (#inked / n) + (#marked / n) + (#cash / n) + (#other / n)_
