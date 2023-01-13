/*
# Problem
https://leetcode.com/problems/product-of-the-last-k-numbers/description/

# Method
Math + Prefix Product Array

# Intuition
<!-- Describe your first thoughts on how to solve this problem. -->

# Approach
<!-- Describe your approach to solving the problem. -->

# Complexity
- Time:
O(1).

- Space:
O(n). Worst case is we only add non-zero numbers.
*/

class ProductOfNumbers {
    constructor() {
        this.prefixProd = [];
        this.currProd = 1;
        this.prodLen = 0
    }

    add(val) {
        // if val equals 0, reset prefix product,
        // and current product
        if (val === 0) {
            this.prefixProd = [];
            this.currProd = 1;
            this.prodLen = 0;
            return;
        }
        // otherwise, multiply value by current product,
        // and push current product to prefix product.
        this.currProd *= val;
        this.prefixProd.push(this.currProd);
        this.prodLen++;
    }

    getProduct(k) {
        // if prefix prod length < k, this means we have encountered a 0
        // in the past and so the prefix prod length restarted, so return 0.
        if (this.prodLen < k) return 0;

        // if k equals prod length, that means we just want to return 
        // the current prefix product.
        if (this.prodLen === k) return this.currProd;
    
        // divide most current prefix product, by
        // (prefix prod length - 1 - k)th index in prefix prod array
        return this.currProd / this.prefixProd[this.prodLen - 1 - k];
    }
}