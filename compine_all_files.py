import os

def concat_files(dir_path, output_file):
    with open(output_file, 'w') as outfile:
        for root, dirs, files in os.walk(dir_path, topdown=True):
            # Exclude specific directories
            dirs[:] = [d for d in dirs if d not in ['env', 'migrations']]

            for file in files:
                if file.endswith('.py'):  # Check if the file is a Python file
                    file_path = os.path.join(root, file)
                    with open(file_path, 'r', errors='ignore') as infile:
                        contents = infile.read()
                        outfile.write(file_path + "---\n")  # Write the file path
                        outfile.write(contents + "\n\n$$$$$$$$$$$$$$$$$$$$$\n\n")  # Write the file contents followed by newlines as a separator



# Usage
concat_files('backend', 'all_python_project_contents.txt')
