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
    this.tablesDB = new TablesDB(this.client);
    this.bucket = new Storage(this.client);
  }

  async createPost({ title, content, featuredImage, status, userId }) {
    try {
      return await this.tablesDB.createRow({
        databaseId: conf.appwriteDatabaseId,
        tableId: conf.appwriteCollectionId,
        rowId: ID.unique(),
        data: {
          title,
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
        databaseId: conf.appwriteDatabaseId,
        tableId: conf.appwriteCollectionId,
        rowId: slug,
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

 async deletePost(rowId) {
  try {
    await this.tablesDB.deleteRow({
      databaseId: conf.appwriteDatabaseId,
      tableId: conf.appwriteCollectionId,
      rowId: rowId, // ✅ existing ID
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
        rowId: slug,
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
            fileId: ID.unique(),
            file

        })
    } catch (error) {
        console.log("Appwrite service :: updateFile :: error", error);
            return false;
    }
  }

  async deleteFile(fileId){
    if (!fileId) return false;
    try {
        await this.bucket.deleteFile({
            bucketId:conf.appwriteBucketId,
            fileId,
        })
        return true
    } catch (error) {
        console.log("Appwrite service :: deleteFile :: error", error);
            return false;
    }
  }

  getFileView(fileId) {
    if (!fileId) return null;
    try {
      return this.bucket.getFileView({
        bucketId: conf.appwriteBucketId,
        fileId,
      });
    } catch (error) {
      console.log("Appwrite service :: getFileView :: error", error);
      return null;
    }
  }
}

const Appwriteservice = new Service();
export default Appwriteservice;
