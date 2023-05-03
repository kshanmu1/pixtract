import json
import boto3

dynamodb = boto3.resource('dynamodb', region_name='us-east-2') # Replace with your DynamoDB region
table_name = 'T_MEDIA_MASTER' # Replace with your DynamoDB table name
table = dynamodb.Table(table_name)

def lambda_handler(event, context):
    try:
        if 'id' in event:
            response = table.get_item(
                Key={
                    'id': event['id']
                }
            )
            item = response['Item']
            return {
                'statusCode': 200,
                'body': {"result":"success", "data":json.dumps(items)}
            }
        else:
            response = table.scan()
            items = response['Items']
            while 'LastEvaluatedKey' in response:
                response = table.scan(ExclusiveStartKey=response['LastEvaluatedKey'])
                items.extend(response['Items'])
            return {
                'statusCode': 200,
                'body': {"result":"success", "data":json.dumps(items)}
            }
    except Exception as e:
        return {
            'statusCode': 500,
            'body': json.dumps('Error getting media: {}'.format(str(e)))
        }
