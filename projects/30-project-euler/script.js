// Problem 1
// Multiples of 3 and 5
// If we list all the natural numbers below 10 that are multiples of 3 or 5, we get 3, 5, 6 and 9. The sum of these multiples is 23.

// Find the sum of all the multiples of 3 or 5 below 1000.
let answer;

function sumOfMultiples(num, limit) {
    let sum = 0, i = 1;

    while (num * i < limit) {
        sum += num * i++;
    }
    return sum;
}

function commonPrimeFactor(array) {
    let common = new Set();
    array.forEach(e => {
        primeFactors(e).forEach(factor => common.add(factor));
    });
    return Array.from(common);
}

function primeFactors(num) {
    let i = 2;
    let factors = [];
    while (num !== 1) {
        if (num % i === 0) {
            factors.push(i);
            while (num % i === 0) {
                num /= i;
            }
            i++;
            factors.forEach(factor => {
                if (i % factor === 0) {
                    i++;
                }
            }
            );
        }
        else {
            i++;
        }
    }
    return factors;
}


answer = sumOfMultiples(3, 1000) + sumOfMultiples(5, 1000) - sumOfMultiples(commonPrimeFactor([3, 5]).reduce((x, y) => x * y), 1000);



// Problem 2
// Even Fibonacci numbers

// Each new term in the Fibonacci sequence is generated by adding the previous two terms. By starting with 1 and 2, the first 10 terms will be:

// 1, 2, 3, 5, 8, 13, 21, 34, 55, 89, ...

// By considering the terms in the Fibonacci sequence whose values do not exceed four million, find the sum of the even-valued terms.

let num = 1;
let prevNum = 0;
let sum = 0;
let temp = 0;
while (num < 4000000) {
    if (num % 2 === 0) {
        sum += num;
    }
    temp = num;
    num = prevNum + num;
    prevNum = temp;
}

answer = sum;

// Problem 3

// Largest prime factor
// The prime factors of 13195 are 5, 7, 13 and 29.

// What is the largest prime factor of the number 600851475143 ?


answer = primeFactors(600851475143).slice(-1)[0];

// Problem 4

// Largest palindrome product
// A palindromic number reads the same both ways.The largest palindrome made from the product of two 2 - digit numbers is 9009 = 91 × 99.

// Find the largest palindrome made from the product of two 3 - digit numbers.

function isPalindrome(num) {
    let isPalindrome = false;
    let numString = String(num);
    let left, right;
    let chNum = numString.length;
    left = Math.floor(chNum / 2) - 1;
    if (chNum % 2 === 0) {
        right = left + 1;
    }
    else {
        right = left + 2;
    }
    while (left >= 0 && right < numString.length) {
        if (numString[left] !== numString[right]) {
            break;
        }
        if (left === 0 && right === (numString.length - 1)) {
            isPalindrome = true;
        }
        left--; right++;
    }
    return isPalindrome;

}

function isPalindrome2(num) {
    let stringNum = String(num);
    if (stringNum.split("").reverse().join("") === stringNum) {
        return true;
    }
    else {
        return false;
    }
}

let maxPalindrome = -1;
let current;
for (let i = 999; i > 99; i--) {
    for (let j = i; j > 99; j--) {
        current = j * i;
        if (current > maxPalindrome && isPalindrome2(current)) {
            maxPalindrome = current;
        }

    }
}

answer = [maxPalindrome];


// Problem 5

// Smallest multiple
// 2520 is the smallest number that can be divided by each of the numbers from 1 to 10 without any remainder.

// What is the smallest positive number that is evenly divisible by all of the numbers from 1 to 20 ?

let set = new Set();
for (let index = 2; index <= 20; index++) {
    primeFactors(index).forEach(e => {
        let multiple = e;
        while (multiple <= 20) {
            multiple *= e;
        }
        set.add(multiple / e);
    });
}


answer = Array.from(set).reduce((x, y) => x * y);


// Problem 6

// Sum square difference
// The sum of the squares of the first ten natural numbers is,

// 1^2+2^2+...+10^2=385
// The square of the sum of the first ten natural numbers is,

// (1+2+...+10)^2=55^2=3025
// Hence the difference between the sum of the squares of the first ten natural numbers and the square of the sum is 3025−385=2640.

// Find the difference between the sum of the squares of the first one hundred natural numbers and the square of the sum.
sum = 0;
for (let index = 1; index <= 100; index++) {
    sum += index;

}
let sqOfSum = sum * sum;
sumOfSq = 0;
for (let index = 1; index <= 100; index++) {
    sumOfSq += index * index;

}
answer = sqOfSum - sumOfSq;

function isPrime(num) {
    if (num < 2) return false;
    if (num < 4) return true;
    if (num === 5) return true;
    if (num % 2 === 0) return false;

    let end = Array.from(String(num)).splice(-1)[0];
    let isPrime = true;
    let checkLimit = Math.floor(num / 2);
    if (end === "1" || end === "3" || end === "7" || end === "9") {
        for (let i = 3; i < checkLimit; i += 2) {
            if (num % i === 0) {
                isPrime = false;
                break;
            }

        }
    }
    else {
        return false;
    }
    return isPrime;
}

// function primeNumbersUntil(num){
//     if(num<2) return [];
//     if(num===2) return [2];

// }

function primeNumbers(amt) {
    let primes = [2], isPrime, count = 1;
    for (let i = 3; count < amt; i++) {
        isPrime = true;
        for (let j = 2; j < i; j++) {
            if (i % j === 0) {
                isPrime = false;
                break;
            }

        }
        if (isPrime) {
            primes.push(i);
            count++;
        }

    }
    return primes;
}

// answer = primeNumbers(10001)[10000];

// Problem 8

// Largest product in a series
// The four adjacent digits in the 1000-digit number that have the greatest product are 9 × 9 × 8 × 9 = 5832.

// 73167176531330624919225119674426574742355349194934
// 96983520312774506326239578318016984801869478851843
// 85861560789112949495459501737958331952853208805511
// 12540698747158523863050715693290963295227443043557
// 66896648950445244523161731856403098711121722383113
// 62229893423380308135336276614282806444486645238749
// 30358907296290491560440772390713810515859307960866
// 70172427121883998797908792274921901699720888093776
// 65727333001053367881220235421809751254540594752243
// 52584907711670556013604839586446706324415722155397
// 53697817977846174064955149290862569321978468622482
// 83972241375657056057490261407972968652414535100474
// 82166370484403199890008895243450658541227588666881
// 16427171479924442928230863465674813919123162824586
// 17866458359124566529476545682848912883142607690042
// 24219022671055626321111109370544217506941658960408
// 07198403850962455444362981230987879927244284909188
// 84580156166097919133875499200524063689912560717606
// 05886116467109405077541002256983155200055935729725
// 71636269561882670428252483600823257530420752963450

// Find the thirteen adjacent digits in the 1000-digit number that have the greatest product. What is the value of this product?

let string = "7316717653133062491922511967442657474235534919493496983520312774506326239578318016984801869478851843858615607891129494954595017379583319528532088055111254069874715852386305071569329096329522744304355766896648950445244523161731856403098711121722383113622298934233803081353362766142828064444866452387493035890729629049156044077239071381051585930796086670172427121883998797908792274921901699720888093776657273330010533678812202354218097512545405947522435258490771167055601360483958644670632441572215539753697817977846174064955149290862569321978468622482839722413756570560574902614079729686524145351004748216637048440319989000889524345065854122758866688116427171479924442928230863465674813919123162824586178664583591245665294765456828489128831426076900422421902267105562632111110937054421750694165896040807198403850962455444362981230987879927244284909188845801561660979191338754992005240636899125607176060588611646710940507754100225698315520005593572972571636269561882670428252483600823257530420752963450";

(function () {
    let current = [], highest = 0, product;
    for (let index = 0; index < string.length; index++) {
        if (index === 0) {
            for (let j = 0; j < 13; j++) {
                current.push(string[index + j]);
            }
            highest = current.reduce((x, y) => Number(x) * Number(y));
        }
        else {
            current.shift();
            current.push(string[index]);
            product = current.reduce((x, y) => Number(x) * Number(y));
            if (product > highest) {
                highest = product;
                console.log(current, highest);
            }
        }

    }
    return highest;
});

// Problem 9

// Special Pythagorean triplet
// A Pythagorean triplet is a set of three natural numbers, a < b < c, for which,

//     a^2 + b^2 = c^2
// For example, 3^2 + 4^2 = 9 + 16 = 25 = 5^2.

// There exists exactly one Pythagorean triplet for which a + b + c = 1000.
// Find the product abc.



// c<500 means a and b are less than 500
// a + b is greater than 500
// b-max = 498, a will be 3-497
answer = (function () {
    for (let b = 498; b >= 251; b--) {
        for (let a = 501 - b; a <= b - 1; a++) {
            if ((a * a) + (b * b) === (1000 - a - b) * (1000 - a - b)) {
                return [a, b, (1000 - a - b)];
            }

        }
    }

});

// Problem 10

// Summation of primes
// The sum of the primes below 10 is 2 + 3 + 5 + 7 = 17.

// Find the sum of all the primes below two million.



answer = (function () {
    let sum = 17, limit, isPrime = true;
    for (let i = 11; i < 2000000; i += 10) {
        isPrime = true;
        limit = Math.floor(i / 2);
        for (let j = 3; j < Math.floor(i / 2); j += 2) {
            if (i % j === 0) {
                isPrime = false;
                break;
            }


        }
        if (isPrime) {
            sum += i;
        }

    }
    for (let i = 13; i < 2000000; i += 10) {
        isPrime = true;
        limit = Math.floor(i / 2);
        for (let j = 3; j < Math.floor(i / 2); j += 2) {
            if (i % j === 0) {
                isPrime = false;
                break;
            }


        }
        if (isPrime) {
            sum += i;
        }

    }
    for (let i = 17; i < 2000000; i += 10) {
        isPrime = true;
        limit = Math.floor(i / 2);
        for (let j = 3; j < Math.floor(i / 2); j += 2) {
            if (i % j === 0) {
                isPrime = false;
                break;
            }


        }
        if (isPrime) {
            sum += i;
        }

    }
    for (let i = 19; i < 2000000; i += 10) {
        isPrime = true;
        limit = Math.floor(i / 2);
        for (let j = 3; j < Math.floor(i / 2); j += 2) {
            if (i % j === 0) {
                isPrime = false;
                break;
            }


        }
        if (isPrime) {
            sum += i;
        }

    }
    return sum;
})();



console.log(answer);
