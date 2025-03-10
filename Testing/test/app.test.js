const sortingByAge = require('../app')

test('testing if the first user is lalit aafter sorting feature', () => {
    const sortedData = sortingByAge();
    expect(sortedData[0].name).toBe("Lalit");
})

test('testing if the last user is Abhinav after sorting feature', () => {
    const sortedData = sortingByAge();
    expect(sortedData[sortedData.length-1].name).toBe("Abhinav");
})

test('testing if the sorted data have length of 4', () => {
    const sortedData = sortingByAge();
    expect(sortedData.length).toBe(4);
})

test('sorted data is not null', () => {
    const sortedData = sortingByAge();
    expect(sortedData).not.toBe(undefined);
})