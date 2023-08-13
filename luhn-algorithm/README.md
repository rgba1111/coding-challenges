## Luhn Algorithm: Credit Card Checker
Small JavaScript algorithm validating credit card numbers, using the Luhn algorithm. The [Luhn algorithm](https://en.wikipedia.org/wiki/Luhn_algorithm) is a series of mathematical calculations used to validate certain identification numbers. Codecademy exercise.

### Luhn algorithm

- Starting from the farthest digit to the right, AKA the check digit, iterate to the left.
- As you iterate to the left, every other digit is doubled (the check digit is not doubled). If the number is greater than 9 after doubling, subtract 9 from its value.
- Sum up all the digits in the credit card number.
- If the sum modulo 10 is 0 (if the sum divided by 10 has a remainder of 0) then the number is valid, otherwise, it’s invalid.

