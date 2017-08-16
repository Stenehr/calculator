
var Calculator = {
    operationsChain: [],
    currentNumber: '',
    total: 0,
    init: function () {
        this.bindEvents();
    },
    bindEvents: function () {
        $('#ac').on('click', this.allClear.bind(this));
        $('#ce').on('click', this.clearEntry.bind(this));
        $('.numberBtn').on('click', this.addToCurrentNumber.bind(this));
        $('.symbol').on('click', this.getTheSymbol.bind(this));        
        $('#equals').on('click', this.calculateFinal.bind(this));
    },
    /** Renders the view for the calculator display
     * symbolOrNum - displayed on the big screen (h3);
     * loops through the operationsChain and displays the items on the smaller screen (p)
    */
    renderView: function (symbolOrNum) {
        $('#display p').html("");
        $('#display h3').html(symbolOrNum);
        this.operationsChain.forEach( function (element) {
            $('#display p').append(element + ' ');
        });
    },
    addToCurrentNumber: function (e) {
        this.currentNumber += $(e.target).val();
        this.renderView(this.currentNumber);
    },
    /** Clicking on a symbol will push the currentNumber and the symbol to operationsChain
     * only if currentNumber exists
    */ 
    getTheSymbol: function (e) {
    var symbol = $(e.target).val();
    if (this.currentNumber) {
        this.operationsChain.push(this.currentNumber);
        this.operationsChain.push(symbol);
    }
    this.currentNumber = "";
    var lastItemIndex = this.operationsChain.length - 1;
    this.renderView(this.operationsChain[lastItemIndex]);
    },
    /** Clicking equals will push the last number to the operationsChain
     * Will calculate the sum of operationsChain
     * Empty the operationsChain
     * currentNumber = total for chaining operations
    */
    calculateFinal: function () {
        this.operationsChain.push(this.currentNumber);
        this.calculateTotal();
        this.operationsChain = [];
        this.currentNumber = this.total;
        this.total = 0;
        this.renderView(this.currentNumber);
    },
    // Clear the current entry
    clearEntry: function () {
        this.currentNumber = "";
        this.renderView("0");
    },
    // Clears all the fields
    allClear: function () {
        this.total = 0;
        this.operationsChain = [];
        this.currentNumber = "";
        this.renderView(0);
    },
    //Operations based on passed in number and symbol calculates total
    mathOperation: function (symbol , number) {
        if (symbol === '+') {
            this.total += Number(number);
        } else if (symbol === '-') {
            this.total -= Number(number);
        } else if (symbol === '/') {
            this.total /= Number(number);
        } else if (symbol === '*') {
            this.total *= Number(number);
        }
    },
    /** Calculates the total sum of operationsChain
     * If the last entered value was a symbol - pop it
     * total = first item of the array
     * loop - checks if the current item is a symbol - if it is pass it to mathOperation with the
     * next item in the array which is a number - will calculate total eventuly
    */
    calculateTotal: function () {
        if (isNaN(this.operationsChain[this.operationsChain.length - 1])) {
            this.operationsChain.pop();
        }
        this.total = Number(this.operationsChain[0]);
        for (var i = 1; i < this.operationsChain.length - 1; i++) {
            if (isNaN(this.operationsChain[i])) {
                this.mathOperation(this.operationsChain[i], this.operationsChain[i + 1]);
            }
        }
    },
};

Calculator.init();