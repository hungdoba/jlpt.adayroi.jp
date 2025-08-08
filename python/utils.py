import os


def get_all_json_files_in_folder(folder_path):
    return [
        os.path.join(folder_path, f)
        for f in os.listdir(folder_path)
        if f.endswith('.json') and os.path.isfile(os.path.join(folder_path, f))
    ]
