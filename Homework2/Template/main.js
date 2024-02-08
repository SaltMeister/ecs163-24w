let abFilter = 25
const width = window.innerWidth;
const height = window.innerHeight;

let scatterLeft = 0, scatterTop = 0;
let scatterMargin = {top: 10, right: 30, bottom: 30, left: 60},
    scatterWidth = 400 - scatterMargin.left - scatterMargin.right,
    scatterHeight = 350 - scatterMargin.top - scatterMargin.bottom;

let distrLeft = 500, distrTop = 0;
let distrMargin = {top: 10, right: 30, bottom: 30, left: 60},
    distrWidth = 500 - distrMargin.left - distrMargin.right,
    distrHeight = 350 - distrMargin.top - distrMargin.bottom;

let teamLeft = 0, teamTop = 400;
let teamMargin = {top: 10, right: 30, bottom: 30, left: 60},
    teamWidth = width - teamMargin.left - teamMargin.right,
    teamHeight = height-450 - teamMargin.top - teamMargin.bottom;





d3.csv("student-mat.csv").then(rawData =>{
    console.log("rawData", rawData);
    

    rawData.forEach(e => {  
        if(e.absences != null)
            e.absences = Number(e.absences)
        if(e.age != null)
            e.age = Number(e.age)
    });

    
//plot 1
    const svg = d3.select("svg")


    const g1 = svg.append("g")
                .attr("width", scatterWidth + scatterMargin.left + scatterMargin.right)
                .attr("height", scatterHeight + scatterMargin.top + scatterMargin.bottom)
                .attr("transform", `translate(${scatterMargin.left}, ${scatterMargin.top})`)

                // Bar Graph for student age groups and acohol consumption with age groups
                // ScatterPlot of  age and abscences
                // ADvanced Table

    g1.append("text")
    .attr("x", scatterWidth / 2)
    .attr("y", scatterHeight + 50)
    .attr("font-size", "20px")
    .attr("text-anchor", "middle")
    .text("Number Of Absences")

    // Y label
    g1.append("text")
    .attr("x", -(scatterHeight / 2))
    .attr("y", -40)
    .attr("font-size", "20px")
    .attr("text-anchor", "middle")
    .attr("transform", "rotate(-90)")
    .text("Age")

    const gX = d3.scaleLinear()
    .domain([0, 93])
    .range([0, scatterWidth])

    const gY = d3.scaleLinear()
        .domain([15, 22])
        .range([scatterHeight, 0])

    const gXAxisCall = d3.axisBottom(gX).ticks(20)
    const gYAxisCall = d3.axisLeft(gY).ticks(7)
    
    g1.append("g")
    .attr("transform", `translate(0, ${scatterHeight})`)
    .call(gXAxisCall)
    .selectAll("text")
        .attr("y", "10")
        .attr("x", "-5")
        .attr("text-anchor", "end")
        .attr("transform", "rotate(-40)")
    
    g1.append("g")
    .attr("transform", `translate(0, 0)`)
    .call(gYAxisCall)

    const rects = g1.selectAll("circle").data(rawData)

    rects.enter().append("circle")
        .attr("cx", d =>  gX(d.absences))
        .attr("cy", d =>  gY(d.age) )
        .attr("r", 3)
        .attr("fill", "steelblue")

    // Plot 2

    const g2 = svg.append("g")
    .attr("width", distrLeft + distrMargin.left + distrMargin.right)
    .attr("height", distrHeight + distrMargin.top + distrMargin.bottom)
    .attr("transform", `translate(${distrMargin.left}, ${distrMargin.top})`)

    // Process Data
    let graph2Data = []
    
    rawData.forEach(d => {
        let averageConsumption = (Number(d.Dalc) + Number(d.Walc)) / 2

        graph2Data.push(
            {
                "averageConsumption": averageConsumption,
                "g1": Number(d.G1),
                "g2": Number(d.G2),
                "g3": Number(d.G3)
            }
        )

    })

    let highConsumption = graph2Data.filter(d => d.averageConsumption > 2.5)
    let lowConsumption = graph2Data.filter(d => d.averageConsumption <= 2.5)
    console.log(graph2Data, highConsumption, lowConsumption)

    // Get Averages of q1 2 3 for each consumption class
    let highQ1 = 0
    let highQ2 = 0
    let highQ3 = 0

    highConsumption.forEach(d => {
        highQ1 += d.g1
        highQ2 += d.g2
        highQ3 += d.g3
    })
    highConsumption = {
        "Q1": highQ1 / highConsumption.length,
        "Q2": highQ2 / highConsumption.length,
        "Q3": highQ3/ highConsumption.length
    }

    let lowQ1 = 0
    let lowQ2 = 0
    let lowQ3 = 0

    lowConsumption.forEach(d => {
        lowQ1 += d.g1
        lowQ2 += d.g2
        lowQ3 += d.g3
    })
    lowConsumption = {
        "Q1": lowQ1 / lowConsumption.length,
        "Q2": lowQ2 / lowConsumption.length,
        "Q3": lowQ3/ lowConsumption.length
    }
    console.log(lowConsumption)

}).catch(function(error) {
  console.log(error);
});
    