var sum = 0;

process.argv.slice(2).filter(function(num) {
	sum = sum + ~~num;
});

console.log(sum);
