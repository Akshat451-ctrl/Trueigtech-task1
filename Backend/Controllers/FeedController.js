import FeedModel from "../Models/FeedModel.js";

class FeedController {

   static async insertFeed(req, res) {
  try {
    const data = req.body;
    const files = req.files;

    if (!files || files.length === 0) {
      return res.status(400).json({
        status: false,
        message: "No file uploaded"
      });
    }

    const result = await FeedModel.insertpost(data, files[0]);

    if (result.affectedRows > 0) {
      return res.status(200).json({
        status: true,
        message: "Feed inserted successfully"
      });
    }

    return res.status(500).json({
      status: false,
      message: "Feed insertion failed"
    });

  } catch (error) {
    console.error(error);
    return res.status(500).json({
      status: false,
      message: "Internal server error"
    });
  }
}
   static async getFeeds(req, res) {
  try {
    const result = await FeedModel.getAllFeeds();

    if (result && result.length > 0) {
      return res.status(200).json({
        status: "success",
        message: "Feeds fetched successfully",
        data: result
      });
    }

    return res.status(200).json({
      status: "success",
      message: "No feeds found",
      data: []
    });

  } catch (error) {
    console.error(error);
    return res.status(500).json({
      status: false,
      message: "Internal server error"
    });
  }
}

}
export default FeedController;