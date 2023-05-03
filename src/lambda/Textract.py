import boto3

def lambda_handler(event, context):
    s3 = boto3.client('s3')
    textract = boto3.client("textract")
    bucket = event['bucket']
    key = event['key']
    response = s3.get_object(Bucket=bucket, Key=key)
    response = textract.detect_document_text(
        Document={
            'S3Object': {
                'Bucket': event['bucket'],
                'Name': event['key']
            }
        }
    )
    return {
        'statusCode': 200,
        'body': response
    }
