const { spawn } = require("child_process");

module.exports = {
    getAPIDiff: (cb) => {
        const cmd = spawn("bump", ["diff", "file1.json", "file2.json"]);
        console.log('Running cmd');
        cmd.stdout.on("data", data => {
            // console.log(`data: ${data}`);
            return cb(null, `${data}`);
        });

        // cmd.stderr.on("data", data => {
        //     console.log(`stderr: ${data}`);
        // });

        // cmd.on('error', (error) => {
        //     console.log(`error: ${error.message}`);
        // });
        //
        // cmd.on("close", code => {
        //     console.log(`child process exited with code ${code}`);
        // });
    }
};