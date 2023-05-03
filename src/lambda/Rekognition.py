import boto3

def lambda_handler(event, context):
    s3 = boto3.client('s3')
    rekognition = boto3.client('rekognition')
    bucket = event['bucket']
    key = event['key']
    response = s3.get_object(Bucket=bucket, Key=key)
    image = response['Body'].read()
    response = rekognition.detect_labels(
        Image={
            'Bytes': image
        },
        MaxLabels = event['maxLabels'],
        MinConfidence = event['minConfidence']
    )
    return {
        'statusCode': 200,
        'body': response
    }

