const searchEntries = require('./search_entries');

test('empty result', async () => {
    const tableName = 'table1';
    const searchLine = 'sdgsd';
	const result = await searchEntries(tableName, searchLine)
	expect(result).toStrictEqual({data: [], count: 0});
});

test('empty searchLine', async () => {
    const tableName = 'table1';
    const searchLine = '';
	const result = await searchEntries(tableName, searchLine);
	expect(result).toStrictEqual({data: [], count: 0});
});

test('empty tableName', async () => {
    const tableName = '';
    const searchLine = 'sddg';
	const result = await searchEntries(tableName, searchLine);
	expect(result).toStrictEqual({data: [], count: 0});
});

test('incorrect tableName', async () => {
    const tableName = 'asaf';
    const searchLine = 'sddg';
	await expect(searchEntries(tableName, searchLine)).rejects.toThrow();
});

test('resulting list < number of found entries', async () => {
    const tableName = 'table2';
    const searchLine = 'a';
    const result = await searchEntries(tableName, searchLine);
	expect(result.data.length).toBeLessThan(result.count);
});

test('resulting list = number of found entries', async () => {
    const tableName = 'table3';
    const searchLine = 'Alex';
	const result = await searchEntries(tableName, searchLine);
	expect(result.data.length).toEqual(result.count);
});
