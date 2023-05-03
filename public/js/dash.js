/*LAST COSTS*/
var data = {
    labels: ["Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov"],
    datasets: [{
        label: 'Spending',
        backgroundColor: "rgba(91,37,245, 0.2)",
        data: [5000, 3000, 8000, 1500, 2000, 1500, 8000, 2000, 8000, 1000],
    }, {
        label: 'Income',
        backgroundColor: "rgba(91,37,245, 1)",
        data: [10000, 8000, 18000, 11000, 10000, 8000, 18000, 16000, 18000, 12000],
    }, ]
};

var options = {
    cornerRadius: 0,
    maintainAspectRatio: false,
    legend: {
        position: 'bottom',
        labels: {
            fontColor: "rgba(0,0,0, 0.5)",
            boxWidth: 20,
            padding: 10
        }
    },
    scales: {
        yAxes: [{
            gridLines: {
                display: true,
                color: "rgba(91,37,245, 0.03)"
            },
            ticks: {
                maxTicksLimit: 5,
            }
        }],
        xAxes: [{}]
    }
};


var ctx = document.getElementById('last_costs').getContext('2d');
var myLineChart = new Chart(ctx, {
    type: 'bar',
    data: data,
    options: options
});

/*EFFICIENCY CHART*/

var data = {
    labels: ["Remaining", "Utilized"],
    datasets: [{
        label: "Population (millions)",
        backgroundColor: ["rgba(91,37,245, 1)", "#dad7e9"],
        data: [65, 35]
    }]
};

var options = {
    maintainAspectRatio: false,
    legend: {
        position: 'bottom',
        labels: {
            fontColor: "rgba(0,0,0, 0.5)",
            boxWidth: 20,
            padding: 10
        }
    },
};


var ctx = document.getElementById('efficiency').getContext('2d');
var myLineChart = new Chart(ctx, {
    type: 'doughnut',
    data: data,
    options: options
});