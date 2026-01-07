import conf from "../conf/conf";

import { Client, Databases, Storage, Query, ID, TablesDB } from "appwrite";

export class Service {
  client = new Client();
  Databases;
  tablesDB;
  bucket;
  constructor() {
    this.client
      .setEndpoint(conf.appwriteUrl)
      .setProject(conf.appwriteProjectId);
    this.tablesDB = new TablesDB(client);
    this.bucket = new Storage(client);
  }

  async createPost({ title, slug, content, featuredImage, status, userId }) {
    try {
      return await this.tablesDB.createRow({
        databaseId: conf.appwriteDatabaseId,
        tableId: conf.appwriteCollectionId,
        rowId: ID.unique(),
        data: {
          title,
          slug,
          content,
          featuredImage,
          status,
          userId,
        },
      });
    } catch (error) {
      console.log("Appwrite service :: createPost :: error", error);
    }
  }

  async updatePost(slug, { title, content, featuredImage, status }) {
    try {
      return await this.tablesDB.updateRow({
        databaseId: conf.databaseId,
        tableId: conf.appwriteCollectionId,
        rowId: ID.unique(),
        data: {
          title,
          slug,
          content,
          featuredImage,
          status,
        },
      });
    } catch (error) {
      console.log("Appwrite service :: updatePost :: error", error);
    }
  }

  async deletePost(slug) {
    try {
      await this.tablesDB.deleteRow({
        databaseId: conf.appwriteDatabaseId,
        tableId: conf.appwriteCollectionId,
        rowId: ID.unique(),
      });
      return true;
    } catch (error) {
      console.log("Appwrite service :: deletePost :: error", error);
      return false;
    }
  }

  async getPosts(queries = [Query.equal("status","active")]){
        try {
            return await this.tablesDB.listRows({
                 databaseId: conf.appwriteDatabaseId,
                tableId: conf.appwriteCollectionId,
                queries:queries
            })
        } catch (error) {
           console.log("Appwrite service :: deletePost :: error", error);
            return false; 
        }
  }

  async getPost(slug) {
    try {
      return await this.tablesDB.getRow({
        databaseId: conf.appwriteDatabaseId,
        tableId: conf.appwriteCollectionId,
        rowId: ID.unique(),
      });
    } catch (error) {
      console.log("Appwrite service :: deletePost :: error", error);
      return false;
    }
  }

  // file upload service

  async uploadFile(file){
    try {
        return await this.bucket.createFile({
            bucketId: conf.appwriteBucketId,
            rowId: ID.unique(),
            file

        })
    } catch (error) {
        console.log("Appwrite service :: deletePost :: error", error);
            return false;
    }
  }

  async deletefile(fileId){
    try {
        await this.bucket.deleteFile({
            bucketId:conf.appwriteBucketId,
            fileId,
        })
        return true
    } catch (error) {
        console.log("Appwrite service :: deletePost :: error", error);
            return false;
    }
  }

  getFilePreview(fileId){
    return this.bucket.getFilePreview({
         bucketId:conf.appwriteBucketId,
            fileId,
    })
  }
}

const service = new Service();
export default service;
