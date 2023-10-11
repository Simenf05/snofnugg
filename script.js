
let snowLevel = 0

const snowflakeArr = []

const snowflakeClusterArr = []
let clusters = 0

const snowLevelEl = document.querySelector("#snowLevel")

const getOverlap = (rect1, rect2) => !(
    rect1.right < rect2.left ||
    rect1.left > rect2.right ||
    rect1.bottom < rect2.top ||
    rect1.top > rect2.bottom
)

function createNewSnowflake() {

    const snowflake = document.createElement("img")

    snowflake.src = "snowflake.webp"

    snowflake.className = "snowflake snowflakeDim"

    snowflake.style.top = "-25px"
    snowflake.style.left = `${Math.floor(Math.random() * innerWidth)}px`

    snowflakeArr.push(snowflake)

    return snowflake
}


function createNewSnowflakeCluster() {

    const snowflakeCount = 5

    const newClusterEl = document.createElement("div")

    newClusterEl.className = `absolute cluster cluster_${clusters}`

    for (let i = 0; i < snowflakeCount; i++) {
        
        const snowflake = createNewSnowflake()

        newClusterEl.appendChild(snowflake)
    }

    clusters += 1
    document.body.appendChild(newClusterEl)
    snowflakeClusterArr.push(newClusterEl)
}

setInterval(createNewSnowflakeCluster, 500)


function updateSnowLevel() {
    const snowLevelRect = snowLevelEl.getBoundingClientRect()

    if (snowLevelRect.top < 0) location.reload()

    snowLevelEl.style.top = `${snowLevelRect.top - 1}px`

}


function snowLevelFlakeCol(snowflake) {

    const snowflakeRect = snowflake.getBoundingClientRect()
    const snowLevelRect = snowLevelEl.getBoundingClientRect()

    return getOverlap(snowLevelRect, snowflakeRect)
}




setInterval(() => {

    

    snowflakeClusterArr.forEach(cluster => {
        if (cluster.innerHTML === "") {
            cluster.remove()
            snowflakeClusterArr.splice(snowflakeClusterArr.indexOf(cluster), 1)
            return
        }

        let clusterTop = cluster.getBoundingClientRect().top
        clusterTop = parseInt(clusterTop)
        clusterTop += 1
        cluster.style.top = `${clusterTop}px`
    });

    
    snowflakeArr.forEach(snowflake => {

        if (snowLevelFlakeCol(snowflake)) {
            snowflake.remove()
            snowflakeArr.splice(snowflakeArr.indexOf(snowflake), 1)
            snowLevel += 1
            updateSnowLevel()
            return
        }

    })
}, 10)

