
/* ___           _ 
  |_  |         | |
    | | ___   __| |
    | |/ _ \ / _` |
/\__/ / (_) | (_| |
\____/ \___/ \__,_|
*/




let url = 'https://apis.is/petrol';

// Fall til að birta stöðvar eftir id
function lookUpGasStation(id) {
	fetch(url)
	.then(res => res.json())
	.then((out) => {

		// Sæki section úr html til sýna upplýsingar
		let container = document.getElementById("container");

		// Bý til nýtt div fyrir verja stöð sem er birt
		let nyttDiv = document.createElement("div");
		nyttDiv.classList.add("divClass");

		// Bý til br
		let nyttBr = document.createElement("br");

		// Sæki fyrirtæki
		let stod = document.createElement("h2");
		stod.innerHTML = out["results"][id].company;
		nyttDiv.appendChild(stod);
		// Sæki bensín verð
		let bensin = document.createElement("p");
		bensin.innerHTML = `<span class="boldClass">Bensín 95:</span> ${out["results"][id].bensin95}kr`;
		nyttDiv.appendChild(bensin);
		// Sæki diesel verð
		let dieselnode = document.createElement("p");
		dieselnode.innerHTML = `<span class="boldClass">Diesel:</span> ${out["results"][id].diesel}kr`;
		nyttDiv.appendChild(dieselnode);
		// Sæki staðsetningu
		let stadsetning = document.createElement("p");
		stadsetning.innerHTML = `<span class="boldClass">Staðsetning:</span> ${out["results"][id].name}`;
		nyttDiv.appendChild(stadsetning);
		// Sæki breytingar tíma
		let breytingaTimi = document.createElement("p");
		breytingaTimi.innerHTML = `<span class="boldClass">Síðast uppfært:</span> ${out["timestampApis"].slice(0,10)} kl ${out["timestampApis"].slice(11,19)}`;
		nyttDiv.appendChild(breytingaTimi);

		container.appendChild(nyttDiv);
		container.appendChild(nyttBr);


	})
	.catch(err => { throw err });
}
//lookUpGasStation(1);


// Function til að finna minstu töluna í array
function min(input) {
	if (toString.call(input) !== "[object Array]")  
		return false;
	return Math.min.apply(null, input);
}

// function til að sjá ódýrustu stöðina
function odyrastaStodin () {
	fetch(url)
	.then(res => res.json())
	.then((out) => {

		let odyrastaID = [];

		for (let i = 0; i < out["results"].length; i++) {
			odyrastaID.push(out["results"][i].bensin95);
		}

		document.getElementById("odyrastaNafn").innerHTML = `Ódýrasta stöðin er ${out["results"][odyrastaID.indexOf(min(odyrastaID))].company}`;
		document.getElementById("odyrastaBensin").innerHTML = `Bensín verð: ${out["results"][odyrastaID.indexOf(min(odyrastaID))].bensin95}kr`;
		document.getElementById("odyrastaDiesel").innerHTML = `Dísel verð: ${out["results"][odyrastaID.indexOf(min(odyrastaID))].diesel}kr`;


	})
	.catch(err => { throw err });
}
odyrastaStodin();


// Sæki allar stöðvar fyrir sama fyrirtæki
function allarStodvar(fyrirtæki) {
	fetch(url)
	.then(res => res.json())
	.then((out) => {

		fjoldiStodva = 0;

		for (let i = 0; i < out["results"].length; i++) {
			if (out["results"][i].company == fyrirtæki.toString()) {
				lookUpGasStation(i);
				fjoldiStodva++;
			}
		}

		document.getElementById("fjoldiStodva").innerHTML = `<span class="boldClass">Fjöldi stöðva:</span> ${fjoldiStodva}`;

	})
	.catch(err => { throw err });
}
// allarStodvar(N1);


// Fall til þess að leita af stðvum með staðsetningu
function leitaAfStod(stadsetning) {
	fetch(url)
	.then(res => res.json())
	.then((out) => {

		for (let i = 0; i < out["results"].length; i++) {
			if (out["results"][i].name == stadsetning) {
				lookUpGasStation(i);
			}
		}
	})
	.catch(err => { throw err });
}
//leitaAfStod("Garðabær");


let submitBtn = document.getElementById("submitBtn").addEventListener("click", () => {

	document.getElementById("container").innerHTML = "";

	let searchBar = document.getElementById("searchBar");
	
	leitaAfStod(searchBar.value.charAt(0).toUpperCase() + searchBar.value.slice(1));
	searchBar.value = "";

	document.getElementById("fjoldiStodva").innerHTML = "";
});


// Messí kóði (yikes)
let atlantsolia = document.getElementById("atlantsolia").addEventListener("click", () => {
	document.getElementById("container").innerHTML = "";
	allarStodvar("Atlantsolía");
});
let costcoIceland = document.getElementById("costcoIceland").addEventListener("click", () => {
	document.getElementById("container").innerHTML = "";
	allarStodvar("Costco Iceland");
});
let daelan = document.getElementById("daelan").addEventListener("click", () => {
	document.getElementById("container").innerHTML = "";
	allarStodvar("Dælan");
});
let n1 = document.getElementById("n1").addEventListener("click", () => {
	document.getElementById("container").innerHTML = "";
	allarStodvar("N1");
});
let ob = document.getElementById("ob").addEventListener("click", () => {
	document.getElementById("container").innerHTML = "";
	allarStodvar("ÓB");
});
let olis = document.getElementById("olis").addEventListener("click", () => {
	document.getElementById("container").innerHTML = "";
	allarStodvar("Olís");
});
let orkan = document.getElementById("orkan").addEventListener("click", () => {
	document.getElementById("container").innerHTML = "";
	allarStodvar("Orkan");
});