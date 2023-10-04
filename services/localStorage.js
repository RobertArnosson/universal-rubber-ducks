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
    saveData: function (key, data) {
        if (isLocalStorageSupported()) {
            localStorage.setItem(key, JSON.stringify(data));
        } else {
            console.error('Local storage is not supported in this browser.');
        }
    },

    // Load data from local storage
    loadData: function (key) {
        if (isLocalStorageSupported()) {
            const data = localStorage.getItem(key);
            return data ? JSON.parse(data) : null;
        } else {
            console.error('Local storage is not supported in this browser.');
            return null;
        }
    },

    // Update data in local storage
    updateData: function (key, newData) {
        if (isLocalStorageSupported()) {
            const existingData = localStorageUtils.loadData(key);
            if (existingData) {
                const updatedData = { ...existingData, ...newData };
                localStorage.setItem(key, JSON.stringify(updatedData));
                return updatedData;
            } else {
                console.error('Data not found in local storage.');
                return null;
            }
        } else {
            console.error('Local storage is not supported in this browser.');
            return null;
        }
    },

    // Delete data from local storage
    deleteData: function (key) {
        if (isLocalStorageSupported()) {
            localStorage.removeItem(key);
        } else {
            console.error('Local storage is not supported in this browser.');
        }
    },

    clearData: function () {
        if (isLocalStorageSupported()) {
            localStorage.clear();
        } else {
            console.error('Local storage is not supported in this browser.');
        }
    },

    // Function to initialize data in local storage if it doesn't exist
    initializeData: function () {
        const keys = [
            'player',
            'achievements',
            'ducks',
            'upgrades',
            'game'
        ];
    
        for (const key of keys) {
            // Construct the filename for the JSON file corresponding to the key
            const filename = `./data/${key}.json`;
    
            // Fetch the JSON data from the file
            fetch(filename)
                .then(response => {
                    if (!response.ok) {
                        throw new Error(`Failed to fetch data for key: ${key}`);
                    }
                    return response.json();
                })
                .then(data => {
                    // Check if data exists in local storage, and if not, save the fetched data
                    const existingData = localStorageUtils.loadData(key);
                    if (!existingData) {
                        localStorageUtils.saveData(key, data);
                    }
                })
                .catch(error => {
                    console.error(error);
                });
        }
    },    
};

export default localStorageUtils;
