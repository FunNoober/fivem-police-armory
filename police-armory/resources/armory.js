

// https://wiki.rage.mp/index.php?title=Weapons_Components
// https://wiki.rage.mp/index.php?title=Weapons
const weaponsData = {
    "weapons": [
        {
            "weapon-name": "M4A1",
            "weapon-hash": "WEAPON_CARBINERIFLE",
            "attachements": [
                {
                    "attachement-name": "Holo-sight",
                    "attachement-hash": "COMPONENT_AT_SCOPE_MEDIUM"
                },
                {
                    "attachement-name": "Flashlight",
                    "attachement-hash": "COMPONENT_AT_AR_FLSH"
                },
                {
                    "attachement-name": "Grip",
                    "attachement-hash": "COMPONENT_AT_AR_AFGRIP"
                }
            ]
        },
        {
            "weapon-name": "Pump shotgun",
            "weapon-hash": "WEAPON_PUMPSHOTGUN",
            "attachements": [
                {
                    "attachement-name": "Flashlight",
                    "attachement-hash": "COMPONENT_AT_AR_FLSH"
                },
            ]
        },
        {
            "weapon-name": "Handgun",
            "weapon-hash": "WEAPON_PISTOL",
            "attachements": [
                {
                    "attachement-name": "Flashlight",
                    "attachement-hash": "COMPONENT_AT_PI_FLSH"
                },
                {
                    "attachement-name": "Extended Mag",
                    "attachement-hash": "COMPONENT_PISTOL_CLIP_02"
                }
            ]
        },
        {
            "weapon-name": "Combat Pistol",
            "weapon-hash": "WEAPON_COMBATPISTOL",
            "attachements": [
                {
                    "attachement-name": "Flashlight",
                    "attachement-hash": "COMPONENT_AT_PI_FLSH"
                },
                {
                    "attachement-name": "Extended Mag",
                    "attachement-hash": "COMPONENT_APPISTOL_CLIP_02"
                }
            ]
        },
        {
            "weapon-name": "Taser",
            "weapon-hash": "WEAPON_STUNGUN",
            "attachements": []  
        },
        {
            "weapon-name": "SMG",
            "weapon-hash": "WEAPON_SMG",
            "attachements": [
                {
                    "attachement-name": "Flashlight",
                    "attachement-hash": "COMPONENT_AT_AR_FLSH"
                },
                {
                    "attachement-name": "Scope",
                    "attachement-hash": "COMPONENT_AT_SCOPE_MACRO_02"
                },
                {
                    "attachement-name": "Extended Mag",
                    "attachement-hash": "COMPONENT_SMG_CLIP_02"
                },
                {
                    "attachement-name": "Suppressor",
                    "attachement-hash": "COMPONENT_AT_PI_SUPP"
                }
            ]
        },
        {
            "weapon-name": "Sniper Rifle",
            "weapon-hash": "WEAPON_SNIPERRIFLE",
            "attachements": [
                {
                    "attachement-name": "Suppressor",
                    "attachement-hash": "COMPONENT_AT_AR_SUPP_02"
                },
                {
                    "attachement-name": "Advanced Scope",
                    "attachement-hash": "COMPONENT_AT_SCOPE_MAX"
                }
            ]
        },
        {
            "weapon-name": "Flashlight",
            "weapon-hash": "WEAPON_FLASHLIGHT",
            "attachements": []
        },
        {
            "weapon-name": "Flare",
            "weapon-hash": "WEAPON_FLARE",
            "attachements": []
        },
        {
            "weapon-name": "Knife",
            "weapon-hash": "WEAPON_KNIFE",
            "attachements": []
        },
        {
            "weapon-name": "Nightstick",
            "weapon-hash": "WEAPON_NIGHTSTICK",
            "attachements": []
        }
    ]
}

window.addEventListener('message', (event) => {
    if (event.data.type == 'open'){
        document.getElementById('armory').style.visibility = 'visible'
    }
    else{
        document.getElementById('armory').style.visibility = 'hidden'
    }
})

function createWeapons(){
    let armory = document.getElementById("armory-container")
    for (let i = 0; i < weaponsData.weapons.length; i++){
        var item = document.createElement('div')
        item.classList.add('weapon-card')
        item.innerHTML = `
        <div class="weapon-title flex-horizontal">
            <h2>${weaponsData.weapons[i]["weapon-name"]}</h2>
            <button data-weapon-hash="${weaponsData.weapons[i]["weapon-hash"]}" class="add-weapon-button">+</button>
        </div>`

        for (let x = 0; x < weaponsData.weapons[i].attachements.length; x++){
            item.innerHTML = item.innerHTML + `
            <div class="weapon-attachements flex-horizontal">
                <h3>${weaponsData.weapons[i].attachements[x]["attachement-name"]}</h3>
                <button data-attachement-hash="${weaponsData.weapons[i].attachements[x]["attachement-hash"]}" data-weapon-hash="${weaponsData.weapons[i]["weapon-hash"]}" class="add-attachement-button">+</button>
            </div>`
        }
        armory.appendChild(item)
    }
}

createWeapons()

function manageListeners(){
    let weaponButtons = document.getElementsByClassName("add-weapon-button")
    let attachementButtons = document.getElementsByClassName("add-attachement-button")
    for (let i = 0; i < weaponButtons.length; i++){
        weaponButtons[i].addEventListener("click", (event) => {
            // weaponButtons[i].dataset.weaponHash
            fetch(`https://${GetParentResourceName()}/giveweapon`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json; charset=UTF-8',
                },
                body: JSON.stringify({
                    weaponHash: weaponButtons[i].dataset.weaponHash
                })
            }).then(resp => resp.json())
        })
    }
    for (let x = 0; x < attachementButtons.length; x++){
        attachementButtons[x].addEventListener("click", (event) => {
            // attachementButtons[x].dataset.attachementHash
            fetch(`https://${GetParentResourceName()}/giveattachement`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json; charset=UTF-8',
                },
                body: JSON.stringify({
                    weaponHash: attachementButtons[x].dataset.weaponHash,
                    weaponAttachement: attachementButtons[x].dataset.attachementHash
                })
            }).then(resp => resp.json())
        })
    }
}

manageListeners()


document.getElementById("close-button").addEventListener("click", (event) => {
    fetch(`https://${GetParentResourceName()}/close`, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json; charset=UTF-8',
        },
        body: JSON.stringify({})
    }).then(resp => resp.json())
})