  // lib/mockData.js

// Your provided JSON data structure
export const membersData = {
  "members": [
    {
      "id": "M001",
      "userInfo": { /* ... john doe data ... */
        "fullName": "John Doe", "email": "john.doe@example.com", "isMember": true,
        "subscriptionStartDate": "2022-01-15", "subscriptionEndDate": "2023-01-15", "subscriptionDuration": 1
       },
      "points": 1250,
      "membershipType": "Standard", // Let's treat this as the Tier Name
      "packageInfo": {
        "packageType": "Premium", // Might be different from tier? Use membershipType for consistency first
        "discounts": [ { "discountType": "Food & Beverage", "discountAmount": 15 }, /* ... */ ]
      }
    },
    {
      "id": "M002",
      "userInfo": { /* ... jane smith data ... */
       "fullName": "Jane Smith", "email": "jane.smith@example.com", "isMember": true,
       "subscriptionStartDate": "2020-03-10", "subscriptionEndDate": "2023-03-10", "subscriptionDuration": 3
      },
      "points": 850,
      "membershipType": "Premium",
      "packageInfo": { "packageType": "Standard", "discounts": [ /* ... */ ] }
    },
    {
      "id": "M003",
      "userInfo": { /* ... robert johnson data ... */
        "fullName": "Robert Johnson", "email": "robert.j@example.com", "isMember": true,
        "subscriptionStartDate": "2018-06-20", "subscriptionEndDate": "2023-06-20", "subscriptionDuration": 5
       },
      "points": 2500,
      "membershipType": "Lifetime", // High points, good example user
      "packageInfo": {
        "packageType": "Elite",
        "discounts": [
            { "discountType": "Food & Beverage", "discountAmount": 20 },
            { "discountType": "Retail", "discountAmount": 15 },
            { "discountType": "Services", "discountAmount": 25 },
            { "discountType": "Events", "discountAmount": 30 }
          ]
      }
    },
     {
      "id": "M004",
      "userInfo": { /* ... sarah williams data ... */
        "fullName": "Sarah Williams", "email": "sarah.w@example.com", "isMember": true,
        "subscriptionStartDate": "2019-11-05", "subscriptionEndDate": "2024-11-05", "subscriptionDuration": 5
       },
      "points": 1800,
      "membershipType": "Lifetime",
      "packageInfo": {
        "packageType": "Elite",
        "discounts": [ /* ... */ ]
      }
    }
  ]
};

// --- Simulate Logged-in User ---
// Choose one user from the data to represent the current session for demo purposes
// Let's pick Robert Johnson (M003) as he has a good set of data
export const mockCurrentUser = membersData.members.find(member => member.id === 'M003') || membersData.members[0]; // Fallback to first user if M003 isn't found

// Export the full list if needed elsewhere (e.g., admin panel)
export const allMockMembers = membersData.members;