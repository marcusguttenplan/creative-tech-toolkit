def upload_blob(bucket_name, source_file_name, destination_blob_name):
    """Uploads a file to the bucket."""
    storage_client = storage.Client()
    bucket = storage_client.bucket(bucket_name)
    blob = bucket.blob(destination_blob_name)
    blob.upload_from_filename(source_file_name)

bucket_name = "crosstown-traffic-vehicle-images"
object_location = os.path.abspath('last-lane.png')
object_name = str(time.time())+'.png'

upload_blob(bucket_name, object_location, "lane/"+object_name)
