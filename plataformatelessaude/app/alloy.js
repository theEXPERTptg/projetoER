// The contents of this file will be executed before any of
// your view controllers are ever executed, including the index.
// You have access to all functionality on the `Alloy` namespace.
//
// This is a great place to do any initialization for your app
// or create any global variables/functions that you'd like to
// make available throughout your app. You can easily make things
// accessible globally by attaching them to the `Alloy.Globals`
// object. For example:
//
// Alloy.Globals.someGlobalFunction = function(){};
var loggedInAccount = "";


var accounts = {
    accounts: [
        {
            "username": "johndoe",
            "password": "1234",
            "name": "John Doe",
            "nif": "272414522",
            "gender": "Male",
            "birthDate": "10/06/1980",
            "email": "john_doe@gmail.com",
            "phoneNumber": "961010123",
            "emergencyName": "Jane Doe",
            "emergencyPhoneNumber": "960101432",
            "relationship": "Wife",
            "weight": "75",
            "height": "170",
            "consultations": [
                {
                    "doctorName": "Dr. Johnny ",
                    "specialisation": "Cardiology",
                    "day": 9,
                    "month": 11, // December (0-based)
                    "year": 2024,
                    "startTime": "13:15",
                    "endTime": "14:00"
                },
                {
                    "doctorName": "Dr. Carlos",
                    "specialisation": "Dermatology",
                    "day": 8,
                    "month": 11, // December (0-based)
                    "year": 2024,
                    "startTime": "10:00",
                    "endTime": "10:30"
                },
                {
                    "doctorName": "Dr. Francisco",
                    "specialisation": "Pediatrics",
                    "day": 6,
                    "month": 11,
                    "year": 2024,
                    "startTime": "14:00",
                    "endTime": "14:30"
                },
                {
                    "doctorName": "Dr. Helder",
                    "specialisation": "Cardiology",
                    "day": 13,
                    "month": 11,
                    "year": 2024,
                    "startTime": "10:30",
                    "endTime": "11:00"
                },
                {
                    "doctorName": "Dr. Zé",
                    "specialisation": "Orthopedics",
                    "day": 7,
                    "month": 0,
                    "year": 2025,
                    "startTime": "15:15",
                    "endTime": "15:45"
                },
                {
                    "doctorName": "Dr. Otávio",
                    "specialisation": "Cardiology",
                    "day": 26,
                    "month": 11,
                    "year": 2024,
                    "startTime": "11:30",
                    "endTime": "12:00"
                },
                {
                    "doctorName": "Dr. Miguel",
                    "specialisation": "Pediatrics",
                    "day": 26,
                    "month": 11,
                    "year": 2024,
                    "startTime": "16:15",
                    "endTime": "16:45"
                },
                {
                    "doctorName": "Dr. Miguel",
                    "specialisation": "Dermatology",
                    "day": 6,
                    "month": 0,
                    "year": 2025,
                    "startTime": "15:30",
                    "endTime": "16:00"
                },
                {
                    "doctorName": "Dr. Carlos",
                    "specialisation": "Dermatology",
                    "day": 15,
                    "month": 11,
                    "year": 2024,
                    "startTime": "14:30",
                    "endTime": "15:00"
                },
                {
                    "doctorName": "Dr. Carlos",
                    "specialisation": "Dermatology",
                    "day": 11,
                    "month": 11,
                    "year": 2024,
                    "startTime": "16:45",
                    "endTime": "17:00"
                },
                {
                    "doctorName": "Dr. Zé",
                    "specialisation": "Orthopedics",
                    "day": 11,
                    "month": 0,
                    "year": 2025,
                    "startTime": "16:15",
                    "endTime": "16:45"
                },
                {
                    "doctorName": "Dr. Helder",
                    "specialisation": "Pediatrics",
                    "day": 28,
                    "month": 11,
                    "year": 2024,
                    "startTime": "12:45",
                    "endTime": "13:00"
                }
            ]
        },
        {
            "username": "janedoe",
            "password": "1234",
            "name": "Jane Doe",
            "nif": "234168080",
            "gender": "Female",
            "birthDate": "01/12/1983",
            "email": "jone_doe@gmail.com",
            "phoneNumber": "960101432",
            "emergencyName": "John Doe",
            "emergencyPhoneNumber": "960101432",
            "relationship": "Husband",
            "pacient": "johndoe",
            "weight": "65",
            "height": "165",
            "consultations": [
                
            ]
        },
        {
            "username": "skipper",
            "password": "1234",
            "name": "Skipper",
            "nif": "234168080",
            "gender": "Male",
            "birthDate": "01/10/2000",
            "email": "skipper@gmail.com",
            "phoneNumber": "960101432",
            "emergencyName": "N/A",
            "emergencyPhoneNumber": "960101432",
            "relationship": "N/A",
            "consultations": [
                
            ]
        }

    ]
};

