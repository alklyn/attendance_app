/* STUDENTS IGNORE THIS FUNCTION
 * All this does is create an initial
 * attendance record if one is not found
 * within localStorage.
 */
(function() {
    const TOTAL_DAYS = 12;

    var model = {
        // Attendance register
        attendance: {
            'Slappy the Frog': [],
            'Lilly the Lizard': [],
            'Paulrus the Walrus': [],
            'Gregory the Goat': [],
            'Adam the Anaconda': []
        },

        getRandom: function() {
            // Generate random true or false values
            return (Math.random() >= 0.5);
        },

        initializeAttendance: function() {
            // Populate the attendance register of each student
            // with true or false values
            console.log('    Creating attendance records...');
            // console.log(this);

            for (var student in this.attendance) {
                // console.log(student);
                for (var day = 0; day < TOTAL_DAYS; day++){
                    this.attendance[student].push(model.getRandom());
                }
            }
        },

        init: function() {
            console.log('Initializing model...');

            if (localStorage.getItem('attendanceData') !== null) {
                console.log('    Loading attendance records from localStorage...');
                this.attendance = JSON.parse(localStorage.getItem('attendanceData'));
            }
            else {
                this.initializeAttendance();
            }

            console.log('Model initialized');
            console.log(this);
        },

        save: function() {
            // Save model to localStorage
            console.log('Saving data to localStorage...');
            localStorage.setItem('attendanceData', JSON.stringify(this.attendance));
        }
    };

    var octopus = {
        init: function() {
            model.init();
            // model.save(); // This is just for tseting
            viewHeader.init();
            viewBody.render(model.attendance);
        },

        getAttendance: function(name) {
            // Get the attendance of student, 'name'.
            return model.attendance[name];
        },
    };

    var viewHeader = {
        init: function() {
            this.render();
        },

        render: function() {
            // Render the header
            var trHeader = $('#tr-header');
            var headerContents = '<th class="name-col">Student Name</th>\n';

            for (var i = 0; i < TOTAL_DAYS; i++) {
                headerContents += '<th>';
                headerContents += i + 1;
                headerContents += '</th>\n';
            }
            headerContents += '<th class="missed-col">Days Missed-col</th>\n';
            // console.log(headerContents);

            trHeader.html(headerContents);
        }
    };

    var viewBody = {
        // Render table body
        // init: function() {
        //     this.render();
        // },

        render: function(attendance){
            var tableBody = $('#table-body');
            var contents = '';
            var checked = '';
            var daysMissed = 0;

            for (var name in attendance) {
                daysMissed = 0;
                contents += '<tr class="student">\n';
                contents += '<td class="name-col">';
                contents += name;
                contents += '</td>\n';

                for (var day = 0; day < TOTAL_DAYS; day++){
                    // Add checkboxes
                    contents += '<td class="attend-col"><input type="checkbox"';

                    if (attendance[name][day]){
                        // Day present.
                        checked = ' checked';
                    }
                    else{
                        // Day absent.
                        checked = '';
                        daysMissed++;
                    }
                    contents += checked;
                    contents += '></td>';
                }

                contents += '<td class="missed-col">';
                contents += daysMissed;
                contents += '</td>\n';
                contents += '</tr>\n';
            }

            console.log(contents);
            tableBody.html(contents);
        }
    };

    octopus.init();


}());
