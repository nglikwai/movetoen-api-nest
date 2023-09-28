const { spawn } = require("child_process");

async function executeRemoteCommands() {
  const hostname = "ec2-54-206-205-99.ap-southeast-2.compute.amazonaws.com";
  const username = "ubuntu";
  const privateKeyPath = "/Users/likwai/my-new-key.pem";

  // replace the '.' with path if not in the project directory
  const firstCommand = [
    // `docker build --platform linux/amd64 -t dse00b/movetoen-nextjs .`,
    `docker push dse00b/movetoen-nextjs`,
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
    "sudo docker rm -f movetoen-nextjs",
    "sudo docker pull dse00b/movetoen-nextjs:latest",
    `sudo docker run -p 3003:3000 --name movetoen-nextjs -d dse00b/movetoen-nextjs`,
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
