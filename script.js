const storyContainer = document.getElementById('story');
const choicesContainer = document.getElementById('choices');
const charactersContainer = document.createElement('div');
charactersContainer.id = 'characters';

let state = {
    hasKey: false,
    hasTreasure: false,
    hasObject: false
};

function startGame() {
    state = {
        hasKey: false,
        hasTreasure: false,
        hasObject: false
    };
    showStoryNode(1);
}

const storyNodes = {
    1: {
        text: "Estás en una encrucijada en un bosque oscuro. Puedes ir a la izquierda hacia una casa iluminada o a la derecha hacia un sendero oscuro.",
        choices: [
            { text: 'Ir a la casa', nextNode: 2 },
            { text: 'Ir al sendero oscuro', nextNode: 3 }
        ]
    },
    2: {
        text: "Entraste a la casa. Hay dos puertas, una roja y una azul.",
        choices: [
            { text: 'Abrir la puerta roja', nextNode: 4 },
            { text: 'Abrir la puerta azul', nextNode: 5 }
        ]
    },
    3: {
        text: "Te adentras en el sendero oscuro y te pierdes en el bosque. Fin de la aventura.",
        choices: [
            { text: 'Volver a empezar', nextNode: 1 }
        ]
    },
    4: {
        text: "Dentro de la habitación encuentras una llave dorada.",
        choices: [
            { text: 'Tomar la llave', nextNode: 6 }
        ]
    },
    5: {
        text: "La puerta azul está cerrada con llave. No puedes avanzar.",
        choices: [
            { text: 'Volver', nextNode: 2 }
        ]
    },
    6: {
        text: "Ahora tienes una llave dorada.",
        choices: [
            { text: 'Volver', nextNode: 2 }
        ]
    },
    7: {
        text: "Te encuentras con un lobo. ¿Qué haces?",
        choices: [
            { text: 'Correr', nextNode: 8 },
            { text: 'Enfrentarlo', nextNode: 9 }
        ]
    },
    8: {
        text: "Corres pero caes en un agujero. Fin de la aventura.",
        choices: [
            { text: 'Volver a empezar', nextNode: 1 }
        ]
    },
    9: {
        text: "Enfrentas al lobo. Él te muestra el camino hacia un tesoro escondido.",
        choices: [
            { text: 'Seguir al lobo', nextNode: 10 }
        ]
    },
    10: {
        text: "Sigues al lobo y encuentras un tesoro brillante.",
        choices: [
            { text: 'Tomar el tesoro', nextNode: 11 }
        ]
    },
    11: {
        text: "¡Felicidades! Has encontrado el tesoro.",
        choices: [
            { text: 'Volver a empezar', nextNode: 1 }
        ]
    },
    12: {
        text: "Encuentras un extraño objeto brillante en el suelo.",
        choices: [
            { text: 'Tomar el objeto', nextNode: 13 }
        ]
    },
    13: {
        text: "Tienes un objeto misterioso en tus manos.",
        choices: [
            { text: 'Volver', nextNode: 2 }
        ]
    },
    14: {
        text: "Utilizas el objeto para abrir una puerta secreta. Desbloqueas un final especial.",
        choices: [
            { text: 'Explorar más', nextNode: 15 }
        ]
    },
    15: {
        text: "Has desbloqueado un final secreto. ¡Felicidades!",
        choices: [
            { text: 'Volver a empezar', nextNode: 1 }
        ]
    }
};

function showStoryNode(nodeIndex) {
    const node = storyNodes[nodeIndex];
    storyContainer.innerText = node.text;

    while (choicesContainer.firstChild) {
        choicesContainer.removeChild(choicesContainer.firstChild);
    }

    node.choices.forEach(choice => {
        const button = document.createElement('button');
        button.innerText = choice.text;
        button.classList.add('choice-button');
        button.onclick = () => makeChoice(nodeIndex, choice.nextNode);
        choicesContainer.appendChild(button);
    });

    updateScene(nodeIndex);
}

function updateScene(nodeIndex) {
    const scene = document.getElementById('game-container');
    scene.innerHTML = '';

    if (nodeIndex === 1) {
        const forest = document.createElement('div');
        forest.id = 'forest';
        scene.appendChild(forest);
        createCharacter('hero', 'Hero', 'hero');
        createObject();
    } else if (nodeIndex === 2) {
        const house = document.createElement('div');
        house.classList.add('house');
        const doorLeft = document.createElement('div');
        doorLeft.classList.add('door', 'door-left');
        house.appendChild(doorLeft);
        const doorRight = document.createElement('div');
        doorRight.classList.add('door', 'door-right');
        house.appendChild(doorRight);
        scene.appendChild(house);
    } else if (nodeIndex === 4 && !state.hasKey) {
        const key = document.createElement('div');
        key.classList.add('key');
        scene.appendChild(key);
    } else if (nodeIndex === 7) {
        createCharacter('villain', 'Wolf', 'villain');
    } else if (nodeIndex === 9 && !state.hasTreasure) {
        createCharacter('treasure', 'Treasure', 'treasure');
    } else if (nodeIndex === 12 && !state.hasObject) {
        createObject();
    }
}

function createCharacter(id, name, type) {
    const character = document.createElement('div');
    character.classList.add('character', type);
    character.title = name;
    charactersContainer.appendChild(character);
}

function createObject() {
    const object = document.createElement('div');
    object.id = 'object';
    object.title = 'Strange Object';
    object.onclick = () => pickObject();
    document.getElementById('game-container').appendChild(object);
}

function pickObject() {
    state.hasObject = true;
    showStoryNode(13);
}

function makeChoice(currentNode, nextNode) {
    if (currentNode === 4 && nextNode === 6) {
        state.hasKey = true;
    } else if (currentNode === 10 && nextNode === 11) {
        state.hasTreasure = true;
    } else if (currentNode === 12 && nextNode === 13) {
        state.hasObject = true;
    } else if (currentNode === 14 && nextNode === 15 && state.hasObject) {
        showStoryNode(nextNode);
        return;
    }
    showStoryNode(nextNode);
}

startGame();
