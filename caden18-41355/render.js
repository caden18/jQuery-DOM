/**
 * Course: COMP 426
 * Assignment: a05
 * Author: <type your name here>
 *
 * This script uses jQuery to build an HTML page with content taken from the
 * data defined in data.js.
 */



/**
 * Given a hero object (see data.js), this function generates a "card" showing
 *     the hero's name, information, and colors.
 * @param hero  A hero object (see data.js)
 */
export const renderHeroCard = function(hero) {
    // TODO: Copy your code from a04 to render the hero card

return`    <div class="grid-container" id="${hero.id}_card">
                <div class="card"  style="background-color: ${hero.backgroundColor};">
                        <div class="card-image">
                            <figure class="image is-4by3">
                                <img class="hero-image" src="${hero.img}">
                                <h2 class="hero-name" style="color: ${hero.color};">${hero.name}</h2>
                            </figure>
                        </div>
                        <div class="card-content">
                            <div class="content">
                                <p class="subtitle" style="color: rgb(235, 228, 228);"><em>"${hero.subtitle}"</em></div>
                                <p style="color: ${hero.color};"><em>Alter ego: </em>${hero.first} ${hero.last}</div>
                                <span style="color: ${hero.color};"><em>First Appearance: </em>${hero.firstSeen.toLocaleDateString("en-US").split()}</span>
                                <p class="description" style="color: ${hero.color};"><br>${hero.description}</p>

                                <div class="edit-button"><br>
                                    <button id="edit" type="button" hero-id="${hero.id}">Edit</button>
                                </div>
                                <br>
                            </div>
                        </div>
                </div>
            </div>`
};



/**
 * Given a hero object, this function generates a <form> which allows the
 *     user to edit the fields of the hero. The form inputs should be
 *     pre-populated with the initial values of the hero.
 * @param hero  The hero object to edit (see data.js)
 */
export const renderHeroEditForm = function(hero) {
    // TODO: Copy your code from a04 to render the hero edit form
  
    return `<form class="editForms${hero.id}">
                <div class="card">
                    <div class="card-content">
                        <div class="field">
                            <label class="label">Hero Name</label>
                            <div class="control">
                                <input id="name${hero.id}" class="input" type="text" value="${hero.name}">
                            </div>
                        </div>
                        <div class="field">
                            <label class="label">First Name</label>
                            <div class="control">
                                <input id="first${hero.id}" class="input" type="text" value="${hero.first}">
                            </div>
                        </div>
                        <div class="field">
                            <label class="label">Last Name</label>
                            <div class="control">
                                <input id="last${hero.id}" class="input" type="text" value="${hero.last}">
                            </div>
                        </div>
                        <div class="field">
                            <label class="label">First Seen</label>
                            <div class="control">
                                <input id="date${hero.id}" class="fs" type="text" value="${hero.firstSeen.toLocaleDateString("en-US").split()}">
                            </div>
                        </div>
                        <div class="field">
                            <label class="label">Description</label>
                                <textarea id="description${hero.id}" type="text" rows="5" cols="35" placeholder="${hero.description}">  
                                ${hero.description}
                                </textarea>
                        </div>
                        <footer class="card-footer">
                            <button id="save" hero-id="${hero.id}" class="card-footer-item" type="submit">Save</button>
                            <button id="cancel" hero-id="${hero.id}" class="card-footer-item" type="button">Cancel</button>
                        </footer>
                    </div>
                </div>
            </form>`

   
};



/**
 * Handles the JavaScript event representing a user clicking on the "edit"
 *     button for a particular hero.
 * @param event  The JavaScript event that is being handled
 */
export const handleEditButtonPress = function(event) {
    // TODO: Render the hero edit form for the clicked hero and replace the
    //       hero's card in the DOM with their edit form instead
    event.preventDefault();
    let id = event.target.getAttribute("hero-id");
    let hero = heroicData.find(x => x.id == id);
    $(`#${hero.id}_card`).replaceWith(renderHeroEditForm(hero));




};



/**
 * Handles the JavaScript event representing a user clicking on the "cancel"
 *     button for a particular hero.
 * @param event  The JavaScript event that is being handled
 */
export const handleCancelButtonPress = function(event) {
    // TODO: Render the hero card for the clicked hero and replace the
    //       hero's edit form in the DOM with their card instead
    let id = event.target.getAttribute("hero-id");
    let hero = heroicData.find(y => y.id == id);
    $(`.editForms${hero.id}`).replaceWith(renderHeroCard(hero));


};



/**
 * Handles the JavaScript event representing a user clicking on the "cancel"
 *     button for a particular hero.
 * @param event  The JavaScript event that is being handled
 */
export const handleEditFormSubmit = function(event) {
    // TODO: Render the hero card using the updated field values from the
    //       submitted form and replace the hero's edit form in the DOM with
    //       their updated card instead
  

    event.preventDefault();
    
    let hero = heroicData.find(y => y.id == event.target.getAttribute("hero-id"));
    hero.name = document.getElementById(`name${hero.id}`).value;
    hero.first = document.getElementById(`first${hero.id}`).value;
    hero.last = document.getElementById(`last${hero.id}`).value;
    hero.description = document.getElementById(`description${hero.id}`).value;
    hero.firstSeen = new Date($(".fs").val());

    $(`.editForms${hero.id}`).replaceWith(renderHeroCard(hero));


};



/**
 * Given an array of hero objects, this function converts the data into HTML,
 *     loads it into the DOM, and adds event handlers.
 * @param  heroes  An array of hero objects to load (see data.js)
 */
export const loadHeroesIntoDOM = function(heroes) {
    // Grab a jQuery reference to the root HTML element
    const $root = $('#root');

    // TODO: Generate the heroes using renderHeroCard()
    //       NOTE: Copy your code from a04 for this part

    // TODO: Append the hero cards to the $root element
    //       NOTE: Copy your code from a04 for this part
    
    for (let i = 0; i < heroes.length; i++) {
        $root.append(renderHeroCard(heroes[i]));
    }

    // TODO: Use jQuery to add handleEditButtonPress() as an event handler for
    //       clicking the edit button

    $root.on('click', "#edit", handleEditButtonPress);

    // TODO: Use jQuery to add handleEditFormSubmit() as an event handler for
    //       submitting the form

    $root.on('click', "#save", handleEditFormSubmit);

    // TODO: Use jQuery to add handleCancelButtonPress() as an event handler for
    //       clicking the cancel button
    $root.on('click', "#cancel", handleCancelButtonPress);
   
};



/**
 * Use jQuery to execute the loadHeroesIntoDOM function after the page loads
 */
$(function() {
    loadHeroesIntoDOM(heroicData);
});
