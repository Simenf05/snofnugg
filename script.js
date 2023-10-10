
let snowLevel = 0

const snowflakeArr = []

function createNewSnowflake() {

    const snowflake = document.createElement("img")

    snowflake.src = "snowflake.webp"

    snowflake.className = "snowflake snowflakeDim"

    snowflake.style.top = "-25px"
    snowflake.style.left = `${Math.floor(Math.random() * innerWidth)}px`

    snowflakeArr.push(snowflake)

    document.body.appendChild(snowflake)

}


setInterval(createNewSnowflake, 100)

setInterval(() => {
    snowflakeArr.forEach(snowflake => {



        let snowflakeTop = snowflake.style.top
        snowflakeTop = parseInt(snowflakeTop)
        snowflakeTop += 1

        if (snowflakeTop > innerHeight) {
            snowflake.remove()
            snowflakeArr.splice(snowflakeArr.indexOf(snowflake), 1)
            snowLevel += 1
            console.log(snowLevel);
            return
        }

        snowflake.style.top = `${snowflakeTop}px`

    })
}, 10)

