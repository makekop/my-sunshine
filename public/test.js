const arrayObject = [
    { name: "Markus", age: 22 },
    { name: "Pekko", age: 35 },
    { name: "Juan", age: 12 },
    { name: "Jukka", age: 52 },
];

//let nameExtract = arrayObject.map(({ name, age }) => ({ [name]: age }));

let nameExtract = arrayObject.map(({ name, age }) => {
    console.log("Name:", name, "\nAge:", age);
});
