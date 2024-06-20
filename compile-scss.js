// const fs = require("fs");
// const path = require("path");
// const { exec } = require("child_process");

// // Đường dẫn tương đối đến thư mục chứa các file SCSS
// const scssDir = path.join(__dirname, "css"); // __dirname là đường dẫn đến thư mục chứa file hiện tại (compile-scss.js)

// fs.readdir(scssDir, (err, files) => {
//   if (err) {
//     console.error("Không thể đọc thư mục SCSS:", err);
//     return;
//   }

//   files.forEach((file) => {
//     if (path.extname(file) === ".scss") {
//       const scssFile = path.join(scssDir, file);
//       const cssFile = path.join(scssDir, path.basename(file, ".scss") + ".css");
//       const command = `sass ${scssFile} ${cssFile}`;

//       exec(command, (error, stdout, stderr) => {
//         if (error) {
//           console.error(`Lỗi biên dịch ${scssFile}:`, error);
//           return;
//         }
//         if (stderr) {
//           console.error(`Lỗi trong quá trình biên dịch ${scssFile}:`, stderr);
//           return;
//         }
//         console.log(`Biên dịch thành công: ${scssFile} -> ${cssFile}`);
//       });
//     }
//   });
// });

const fs = require("fs");
const path = require("path");
const { exec } = require("child_process");

// Đường dẫn tương đối đến thư mục chứa các file SCSS
const scssDir = path.join(__dirname, "css"); // __dirname là đường dẫn đến thư mục chứa file hiện tại (compile-scss.js)

// Hàm duyệt đệ quy qua tất cả các thư mục con
const traverseDir = (dir) => {
  fs.readdir(dir, (err, files) => {
    if (err) {
      console.error("Không thể đọc thư mục SCSS:", err);
      return;
    }

    files.forEach((file) => {
      const filePath = path.join(dir, file);
      fs.stat(filePath, (err, stat) => {
        if (err) {
          console.error("Không thể đọc file:", err);
          return;
        }

        if (stat.isDirectory()) {
          // Nếu là thư mục, duyệt tiếp tục vào thư mục con
          traverseDir(filePath);
        } else if (path.extname(file) === ".scss") {
          // Nếu là file SCSS, biên dịch sang CSS
          const cssFile = path.join(dir, path.basename(file, ".scss") + ".css");
          const command = `sass ${filePath} ${cssFile}`;

          exec(command, (error, stdout, stderr) => {
            if (error) {
              console.error(`Lỗi biên dịch ${filePath}:`, error);
              return;
            }
            if (stderr) {
              console.error(
                `Lỗi trong quá trình biên dịch ${filePath}:`,
                stderr
              );
              return;
            }
            console.log(`Biên dịch thành công: ${filePath} -> ${cssFile}`);
          });
        }
      });
    });
  });
};

// Bắt đầu từ thư mục gốc
traverseDir(scssDir);
