// Helper function to check if localStorage is available
function isLocalStorageSupported() {
    try {
        localStorage.setItem('test', 'test');
        localStorage.removeItem('test');
        return true;
    } catch (e) {
        return false;
    }
}

// Create a module for localStorage operations
const localStorageUtils = {
    // Save data to local storage
    saveData: async function (key, data) {
        return new Promise((resolve, reject) => {
            if (isLocalStorageSupported()) {
                try {
                    localStorage.setItem(key, JSON.stringify(data));
                    resolve();
                } catch (error) {
                    reject(error);
                }
            } else {
                reject(new Error('Local storage is not supported in this browser.'));
            }
        });
    },

    // Load data from local storage
    loadData: async function (key) {
        return new Promise((resolve, reject) => {
            if (isLocalStorageSupported()) {
                try {
                    const data = localStorage.getItem(key);
                    resolve(data ? JSON.parse(data) : null);
                } catch (error) {
                    reject(error);
                }
            } else {
                reject(new Error('Local storage is not supported in this browser.'));
            }
        });
    },

    // Update data in local storage
    updateData: async function (key, newData) {
        return new Promise(async (resolve, reject) => {
            if (isLocalStorageSupported()) {
                try {
                    const existingData = await localStorageUtils.loadData(key);
                    if (existingData) {
                        const updatedData = { ...existingData, ...newData };
                        await localStorageUtils.saveData(key, updatedData); // Save merged data
                        resolve(updatedData);
                    } else {
                        reject(new Error('Data not found in local storage.'));
                    }
                } catch (error) {
                    reject(error);
                }
            } else {
                reject(new Error('Local storage is not supported in this browser.'));
            }
        });
    },

    // Delete data from local storage
    deleteData: async function (key) {
        return new Promise((resolve, reject) => {
            if (isLocalStorageSupported()) {
                try {
                    localStorage.removeItem(key);
                    resolve();
                } catch (error) {
                    reject(error);
                }
            } else {
                reject(new Error('Local storage is not supported in this browser.'));
            }
        });
    },

    clearData: async function () {
        return new Promise((resolve, reject) => {
            if (isLocalStorageSupported()) {
                try {
                    localStorage.clear();
                    resolve();
                } catch (error) {
                    reject(error);
                }
            } else {
                reject(new Error('Local storage is not supported in this browser.'));
            }
        });
    },

    // Function to initialize data in local storage if it doesn't exist
    initializeData: async function () {
        const keys = [
            'player',
            'achievements',
            'ducks',
            'upgrades',
            'game'
        ];

        const promises = keys.map(async (key) => {
            // Construct the filename for the JSON file corresponding to the key
            const filename = `./data/${key}.json`;

            try {
                // Fetch the JSON data from the file
                const response = await fetch(filename);
                if (!response.ok) {
                    throw new Error(`Failed to fetch data for key: ${key}`);
                }
                const data = await response.json();

                // Check if data exists in local storage, and if not, save the fetched data
                const existingData = await localStorageUtils.loadData(key);
                if (!existingData) {
                    await localStorageUtils.saveData(key, data);
                }
            } catch (error) {
                console.error(error);
            }
        });

        // Wait for all promises to complete
        await Promise.all(promises);
    },
};

export default localStorageUtils;
