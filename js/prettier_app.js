/* STUDENTS IGNORE THIS FUNCTION
 * All this does is create an initial
 * attendance record if one is not found
 * within localStorage.
 */
(function() {
    const TOTAL_DAYS = 12;

    var model = {
        students: [
            {
                name: 'Slappy the Frog',
                attendance: []
            },
            {
                name: 'Lilly the Lizard',
                attendance: []
            },
            {
                name: 'Paulrus the Walrus',
                attendance: []
            },
            {
                name: 'Gregory the Goat',
                attendance: []
            },
            {
                name: 'Adam the Anaconda',
                attendance: []
            }
        ],

        getRandom: function() {
            // Generate random true or false values
            return (Math.random() >= 0.5);
        },

        initializeAttendance: function() {
            // Populate the attendance register of each student
            // with true or false values
            console.log('    Creating attendance records...');
            // console.log(this);
            this.students.forEach(function(student) {
                for (var day = 0; day < TOTAL_DAYS; day++){
                    student.attendance.push(model.getRandom());
                }
            });
        },

        init: function() {
            console.log('Initializing model...');

            if (localStorage.getItem('studentData') !== null) {
                console.log('    Loading attendance records from localStorage...');
                this.students = JSON.parse(localStorage.getItem('studentData'));
            }
            else {
                this.initializeAttendance();
                this.isInitialized = true;
            }

            console.log('Model initialized');
            console.log(this);
        },

        save: function() {
            // Save model to localStorage
            localStorage.setItem("studentData", JSON.stringify(this.students));
        }
    };

    var octopus = {
        init: function() {
            model.init();
            model.save();
            view.init();
        },


    };

    var view = {
        init: function() {
            console.log("Do something!");
        }
    };

    octopus.init();


}());
