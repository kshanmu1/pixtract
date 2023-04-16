import PixMedia from "@/models/pixmedia";
import AWS from "aws-sdk";
interface PartiQLExecuteStatementInput extends AWS.DynamoDB.DocumentClient.ExecuteStatementInput {
    ExpressionAttributeNames: { [key: string]: string };
    ExpressionAttributeValues: { [key: string]: AWS.DynamoDB.DocumentClient.AttributeValue };
  }
export default new class MediaMaster {
  private ddb: AWS.DynamoDB;
  private tableName = "T_MEDIA_MASTER";

  constructor() {
    this.ddb = new AWS.DynamoDB();
  }

  async createMedia(mediaData: any): Promise<any> {
    const params: AWS.DynamoDB.Types.ExecuteStatementInput = {
      Statement: `INSERT INTO ${this.tableName} VALUE ?`,
      Parameters: [{ M: mediaData }],
    };

    return await this.ddb.executeStatement(params).promise();
  }

  async readMedia(mediaId: string): Promise<any> {
    const params: AWS.DynamoDB.Types.ExecuteStatementInput = {
      Statement: `SELECT * FROM ${this.tableName} WHERE ID = ?`,
      Parameters: [{ S: mediaId }],
    };

    const result = await this.ddb.executeStatement(params).promise();

    if (result.Items && result.Items.length > 0) {
      return AWS.DynamoDB.Converter.unmarshall(result.Items[0]);
    } else {
      return null;
    }
  }

//   async updateMedia(media: PixMedia): Promise<PixMedia> {
//     const { id: mediaId, ...update } = media;
//     const [updateExpression, expressionAttributeNames, expressionAttributeValues] = this.getUpdateExpression(update);
  
//     const params: PartiQLExecuteStatementInput = {
//       Statement: `UPDATE ${this.tableName} ${updateExpression} WHERE ID = :id RETURNING *`,
//       Parameters: [{ S: mediaId }],
//       ExpressionAttributeNames: expressionAttributeNames,
//       ExpressionAttributeValues: expressionAttributeValues,
//     };
  
//     const result = await this.client.executeStatement(params).promise();
//     if (result.Items && result.Items.length > 0) {
//       return AWS.DynamoDB.Converter.unmarshall(result.Items[0]);
//     } else {
//       throw new Error(`Media with ID ${mediaId} not found`);
//     }
//   }
  async deleteMedia(mediaId: string): Promise<any> {
    const params: AWS.DynamoDB.Types.ExecuteStatementInput = {
      Statement: `DELETE FROM ${this.tableName} WHERE ID = ? RETURNING *`,
      Parameters: [{ S: mediaId }],
    };

    const result = await this.ddb.executeStatement(params).promise();

    if (result.Items && result.Items.length > 0) {
        return AWS.DynamoDB.Converter.unmarshall(result.Items[0]);
      } else {
        return null;
      }
      }
}
      