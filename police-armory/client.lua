local witinArmoryRadius = false
local armoryOpen = false
Citizen.CreateThread(function ()
    while true do
        Citizen.Wait(0)
        local playerPed = GetPlayerPed(-1)
        local playerCoords = GetEntityCoords(playerPed)
        for i = 1, #Config.armories do
            local distance = playerDistancetoArmory(playerCoords, Config.armories[i])
            if distance <= Config.armories[i].radius then
                witinArmoryRadius = true
                if IsControlJustPressed(1, 51) then
                    armoryOpen = not armoryOpen
                    if armoryOpen == true then
                        openArmory()
                    else
                        closeArmory()
                    end
                end
            else
                witinArmoryRadius = false
            end
            if witinArmoryRadius == true then
                BeginTextCommandDisplayHelp("THREESTRINGS")
                AddTextComponentSubstringPlayerName("Press ~INPUT_CONTEXT~ to open armory")
                -- AddTextComponentSubstringPlayerName(lineTwo or "")
                -- AddTextComponentSubstringPlayerName(lineThree or "")
            end
            EndTextCommandDisplayHelp(0, false, true, 0)
        end
    end
end)

function playerDistancetoArmory(playerCoords, armory)
    return GetDistanceBetweenCoords(playerCoords.x, playerCoords.y, playerCoords.z, armory.x, armory.y, armory.z, false)
end

function openArmory()
    SendNUIMessage({
        type = "open"
    })
    SetNuiFocus(true, true)
end

function closeArmory()
    SendNUIMessage({
        type = "close"
    })
    SetNuiFocus(false, false)
end

RegisterNUICallback("close", function ()
    armoryOpen = false
    SendNUIMessage({
        type = "close"
    })
    SetNuiFocus(false, false)
end)

RegisterNUICallback('giveweapon', function (data, cb)
    SetNotificationTextEntry("STRING")
    AddTextComponentSubstringPlayerName("~c~Weapon " .. "~b~" .. data.weaponHash .. "~s~" .. "~c~ Acquired")
    DrawNotification(true, true)
    GiveWeaponToPed(GetPlayerPed(-1), data.weaponHash, 1000, false, false)
end)

RegisterNUICallback('giveattachement', function (data, cb)
    SetNotificationTextEntry("STRING")
    AddTextComponentSubstringPlayerName("~c~Attachement " .. "~b~" .. data.weaponAttachement .. "~s~" .. "~c~ Acquired")
    DrawNotification(true, true)
    GiveWeaponComponentToPed(PlayerPedId(), GetHashKey(data.weaponHash), GetHashKey(data.weaponAttachement))
end)