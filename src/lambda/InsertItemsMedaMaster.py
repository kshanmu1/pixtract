import json
import boto3

dynamodb = boto3.resource('dynamodb', region_name='us-east-2') # Replace with your DynamoDB region
table_name = 'T_MEDIA_MASTER' # Replace with your DynamoDB table name
table = dynamodb.Table(table_name)

def lambda_handler(event, context):
    try:
        media_list = event['media']
        with table.batch_writer() as batch:
            for media in media_list:
                batch.put_item(
                    Item={
                        'id': media['id'],
                        'type': media['type'],
                        'name': media['name'],
                        'extension': media['extension'],
                        'url': media['url'],
                        'contentProviderMetadata': media['contentProviderMetadata'],
                        'folder': media['folder'],
                        'searchText': media['searchText'],
                        'searchTags': media['searchTags'],
                        'localPath': media['localPath'],
                        'digitizedNoteDocUrl': media['digitizedNoteDocUrl'],
                        'digitizedNoteDocLocal': media['digitizedNoteDocLocal']
                    }
                )
        return {
            'statusCode': 200,
            'body': {"result" : "success",
                     "data" : json.dumps(media_list)
            }
        }
    except Exception as e:
        return {
            'statusCode': 500,
            'body': json.dumps('Error inserting media: {}'.format(str(e))),
            'sent': event
        }