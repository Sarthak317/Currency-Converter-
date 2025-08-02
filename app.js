const base_url="https://open.er-api.com/v6/latest/";
const dropdown = document.querySelectorAll(".dropdown select");
const fromCurr = document.querySelector(".from select");
const toCurr = document.querySelector(".to select");
const msg = document.querySelector(".msg");

for(let select of dropdown){
    for(CurrCode in countryList){
        let newOption = document.createElement("option");
        newOption.innerText = CurrCode;
        newOption.value = CurrCode;
        if(select.name === "from" && CurrCode ==="USD"){
            newOption.selected = "selected";
        }
        else if(select.name === "to" && CurrCode ==="INR"){
            newOption.selected = "selected";
        }
        select.append(newOption);
    }
    select.addEventListener("change",(evt)=>{
            updateFlg(evt.target);
        })
}
const updateFlg = (element)=>{
    CurrCode = element.value;
    let CountryCode = countryList[CurrCode];
    let newSrc = `https://flagsapi.com/${CountryCode}/shiny/64.png`;
    let img = element.parentElement.querySelector("img");
    img.src=newSrc;
} 
const button = document.querySelector("form button");
button.addEventListener("click",async (evt)=>{
    evt.preventDefault();
    let amt = document.querySelector(".amtinp");
    let amtval = amt.value;
    if(amtval === "" || amtval<1){
        amtval = 1;
        amt.value ="1";
    }
    const url = `${base_url}/${fromCurr.value}`;
    let response = await fetch(url);
    let data = await response.json();
    let exchangeRate = data.rates[toCurr.value];
    let finalamt = amtval*exchangeRate;
    msg.innerText = `${amtval} ${fromCurr.value} = ${finalamt} ${toCurr.value}`;
})
