import axios from "axios";

const API_KEY = "patJJw7VRMym1JIeu.ac2d1375105d74a0e01841687bb81f26313bd2a87cb3234eef160e2d423d96b1"; // Replace with your Airtable API Key
const BASE_URL = "https://api.airtable.com/v0";
const WORKSPACE_ID = "wsp8Ogj4vJ3v01xav"
const commentBaseName = 'FeedBackComment'
const commentTableName = 'Comment'
export const AppName = 'TG Feedbacks'

export const adminEmail="brahma.tgtech@gmail.com";
export const adminName="Brahma Nishad";
/** BASES **/
function getCommentTableStructure() {
  const fields = [
    { name: "Text", type: "singleLineText" }, // Primary field
    { name: "RecordID", type: "singleLineText" },
    { name: "UserName", type: "singleLineText" },
    { name: "UserEmail", type: "singleLineText" },
  ];
  const tables = [
    {
      description: '',
      fields: fields,
      name: commentTableName
    }
  ]
  return tables
}
// Get the list of all bases
export const getBases = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/meta/bases`, {
      headers: {
        Authorization: `Bearer ${API_KEY}`
      }
    });
    return response.data.bases; // Returns list of bases
  } catch (error) {
    console.error("Error fetching bases:", error);
    throw error;
  }
};

export async function GetCommentTable() {
  const list = await getBases()
  let base = list.find(x => x.name === commentBaseName)
  if (!base) {
    await createBase(commentBaseName, getCommentTableStructure())
    const temp_list = await getBases()
    base = temp_list.find(x => x.name === commentBaseName)
  }


  const Tablelist = await getTablesInBase(base.id)
  let table = Tablelist.find(x => x.name === commentTableName)
  if (table) {
    return {
      BaseId: base.id,
      TableId: table.id
    }
  }
}

// Function to create a new base with a table and fields
export const createBase = async (baseName, table) => {
  try {
    const list = await getBases()
    if (list.find(x => x.name === baseName)) {
      return
    }
    const response = await axios.post(
      `${BASE_URL}/meta/bases`, // Use BASE_URL with the `/meta/bases` endpoint
      {
        name: baseName,
        tables: table,
        workspaceId: WORKSPACE_ID
      },
      {
        headers: {
          Authorization: `Bearer ${API_KEY}`, // Include PAT in the headers
          "Content-Type": "application/json", // Indicate JSON payload
        },
      }
    );
    return response.data; // Returns the created base's details
  } catch (error) {
    console.error("Error creating base with table:", error.response ? error.response.data : error.message);
    throw error;
  }
};

export const getTablesInBase = async (baseId) => {
  try {
    const response = await axios.get(
      `${BASE_URL}/meta/bases/${baseId}/tables`,  // Endpoint to get tables in a base
      {
        headers: {
          Authorization: `Bearer ${API_KEY}`,  // Include the API key in the header
        },
      }
    );
    console.log("Tables in the base:", response.data.tables);  // Log the tables
    return response.data.tables;
  } catch (error) {
    console.error("Error fetching tables:", error.response?.data || error.message);
  }
};



export const createTable = async (BaseID, table) => {
  try {
    const response = await axios.post(
      `${BASE_URL}/meta/bases/${BaseID}/tables`, // Use BASE_URL with the `/meta/bases` endpoint
      table,
      {
        headers: {
          Authorization: `Bearer ${API_KEY}`, // Include PAT in the headers
          "Content-Type": "application/json", // Indicate JSON payload
        },
      }
    );
    return response.data; // Returns the created base's details
  } catch (error) {
    console.error("Error creating base with table:", error.response ? error.response.data : error.message);
    throw error;
  }
};


export const createTableRecords = async (BaseID, tableId, records) => {
  try {
    const response = await axios.post(
      `${BASE_URL}/${BaseID}/${tableId}`, // Use BASE_URL with the `/meta/bases` endpoint
      records,
      {
        headers: {
          Authorization: `Bearer ${API_KEY}`, // Include PAT in the headers
          "Content-Type": "application/json", // Indicate JSON payload
        },
      }
    );
    return response.data; // Returns the created base's details
  } catch (error) {
    console.error("Error creating base with table:", error.response ? error.response.data : error.message);
    throw error;
  }
};


export const getTableRecords = async (BaseID, tableId, formula = '') => {
  try {
    const response = await axios.get(
      `${BASE_URL}/${BaseID}/${tableId}?filterByFormula=${encodeURIComponent(formula)}`, // Use BASE_URL with the `/meta/bases` endpoint
      {
        headers: {
          Authorization: `Bearer ${API_KEY}`, // Include PAT in the headers
          "Content-Type": "application/json", // Indicate JSON payload
        }
      }
    );
    return response.data; // Returns the created base's details
  } catch (error) {
    console.error("Error creating base with table:", error.response ? error.response.data : error.message);
    throw error;
  }
};

export const getRecordByID = async (BaseID, tableId, recordId) => {
  try {
    const response = await axios.get(
      `${BASE_URL}/${BaseID}/${tableId}/${recordId}`, // Use BASE_URL with the `/meta/bases` endpoint
      {
        headers: {
          Authorization: `Bearer ${API_KEY}`, // Include PAT in the headers
          "Content-Type": "application/json", // Indicate JSON payload
        },
      }
    );
    return response.data; // Returns the created base's details
  } catch (error) {
    console.error("Error creating base with table:", error.response ? error.response.data : error.message);
    throw error;
  }
};


export const getRecordComments = async (BaseID, tableId, recordId) => {
  try {
    const response = await axios.get(
      `${BASE_URL}/${BaseID}/${tableId}/${recordId}/comments`, // Use BASE_URL with the `/meta/bases` endpoint
      {
        headers: {
          Authorization: `Bearer ${API_KEY}`, // Include PAT in the headers
          "Content-Type": "application/json", // Indicate JSON payload
        },
      }
    );
    return response.data; // Returns the created base's details
  } catch (error) {
    console.error("Error creating base with table:", error.response ? error.response.data : error.message);
    throw error;
  }
};


export const createRecordComment = async (BaseID, tableId, recordId, Comment) => {
  try {
    const response = await axios.post(
      `${BASE_URL}/${BaseID}/${tableId}/${recordId}/comments`, // Use BASE_URL with the `/meta/bases` endpoint
      {
        "text": Comment
      },
      {
        headers: {
          Authorization: `Bearer ${API_KEY}`, // Include PAT in the headers
          "Content-Type": "application/json", // Indicate JSON payload
        },
      }
    );
    return response.data; // Returns the created base's details
  } catch (error) {
    console.error("Error creating base with table:", error.response ? error.response.data : error.message);
    throw error;
  }
};



export const deleteTableRecord = async (BaseID, tableId, recordId) => {
  try {
    const response = await axios.delete(
      `${BASE_URL}/${BaseID}/${tableId}/${recordId}`, // Use BASE_URL with the `/meta/bases` endpoint
      {
        headers: {
          Authorization: `Bearer ${API_KEY}`, // Include PAT in the headers
          "Content-Type": "application/json", // Indicate JSON payload
        },
      }
    );
    return response.data; // Returns the created base's details
  } catch (error) {
    console.error("Error creating base with table:", error.response ? error.response.data : error.message);
    throw error;
  }
};



export const updateTableRecord = async (BaseID, tableId, recordId, payload) => {
  try {
    const response = await axios.patch(
      `${BASE_URL}/${BaseID}/${tableId}/${recordId}`, // Use BASE_URL with the `/meta/bases` endpoint
      { fields: payload },
      {
        headers: {
          Authorization: `Bearer ${API_KEY}`, // Include PAT in the headers
          "Content-Type": "application/json", // Indicate JSON payload
        },
      }
    );
    return response.data; // Returns the created base's details
  } catch (error) {
    console.error("Error creating base with table:", error.response ? error.response.data : error.message);
    throw error;
  }
};
