const { spawn } = require("child_process");

async function executeRemoteCommands() {
  const hostname = "ec2-54-206-205-99.ap-southeast-2.compute.amazonaws.com";
  const username = "ubuntu";
  const privateKeyPath = "/Users/likwai/my-new-key.pem";

  // replace the '.' with path if not in the project directory
  const firstCommand = [
    // `docker build --platform linux/amd64 -t dse00b/movetoen-api-nest .`,
    `docker push dse00b/movetoen-api-nest`,
  ];

  // Spawn a local process to run the first command
  const firstProcess = spawn(firstCommand.join(";"), { shell: true });

  firstProcess.stdout.on("data", (data) => {
    console.log(`Output: ${data}`);
  });

  firstProcess.stderr.on("data", (data) => {
    console.error(`Error: ${data}`);
  });

  firstProcess.on("close", (code) => {
    console.log(`Process exited with code ${code}`);
  });

  await new Promise((resolve) => {
    firstProcess.on("close", () => {
      resolve();
    });
  });

  // Command to run on the EC2 instance
  const commands = [
    "sudo docker rm -f movetoen-api-nest",
    "sudo docker pull dse00b/movetoen-api-nest:latest",
    `sudo docker run -p 3004:3004 --name movetoen-api-nest -d -e FE_BASE_URL=https://api.dse00.com:3003 -e REDIS_URL=redis://54.206.205.99:6379 -e JWT_SECRET_KEY=secret -e JWT_SECRET_EXPIRES_IN="7 days" -e COOKIE_MAX_AGE=604800000 -e SESSION_SECRET=secret -e NODE_ENV=production -e "PORT=3004" -e APP_ENV=development -e GOOGLE_CLIENT_ID=787852599289-idj76rjibl8a6ogm1u2vu8nm18cjdjo6.apps.googleusercontent.com -e GOOGLE_CLIENT_SECRET=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 -e GOOGLE_CALLBACK_URL="/v1.0/auth/google/callback" -e GOOGLE_FAILURE_URL='/login'  -e "MONGODB_URI=mongodb+srv://nglikwai:dse00com@cluster0.hwgq8.mongodb.net/myFirstDatabase?retryWrites=true&w=majority" dse00b/movetoen-api-nest    `,
  ];
  // Spawn an SSH process to execute the command on the EC2 instance
  const sshProcess = spawn("ssh", [
    "-i",
    privateKeyPath,
    `${username}@${hostname}`,
    commands.join(";"),
  ]);

  // Listen to process events
  sshProcess.stdout.on("data", (data) => {
    console.log(`Output: ${data}`);
  });

  sshProcess.stderr.on("data", (data) => {
    console.error(`Error: ${data}`);
  });

  sshProcess.on("close", (code) => {
    console.log(`Process exited with code ${code}`);
  });
}

executeRemoteCommands().catch((error) => {
  console.error("Error:", error);
});
