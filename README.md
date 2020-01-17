# xeretec

Running the program:

Backend. 
	1. Enter the backend/textprocess folder
	2. start in a command window: "dotnet run"
	
Frontend:
	1. Enter the ui folder
	2. start "npm install"
	3. start "npm run watch"
	
	
Information about the program:

limitations:
	- Unicode not handled properly (using byte array)
	- big files (>1 GB) may cause memory overflow because the whole file is read into the memory
	- more unit tests and detailed exception handling is missing too
	- It would be more beautiful to separate the process functions (counting, word counting and so on) but the speed of process would be (much?) lower / depend on file size, so this solution is optimized for processing many smaller (<1gb) files. It is optimized for process mid-size files
	
Sorry about the UI, I didn't have time to create more beautiful UI for file upload and visualize the result. I had problems for synchonize the file upload.
	
