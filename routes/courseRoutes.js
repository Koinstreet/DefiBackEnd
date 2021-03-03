const express = require("express");


// NEW CONTROLLERS
const course = require("../controllers/v1/course");
const courseModule = require("../controllers/v1/module");

// MIDDLEWARE
const authMiddleware = require("../middleware/auth");
const courseMiddleware = require("../middleware/course");

const router = express.Router();

router.get("/", course.getPublishedCourse);

router.get("/:id", course.getCourse);
router.get("/:courseId/module", courseModule.getCourseAllModule);

router.use(authMiddleware.protect);

router.get("/:courseId/module/:moduleId", courseModule.getModule);
router.get("/user/viewed", courseModule.getViewedCourses);

router.use(authMiddleware.restrictTo("admin"));

router.get("/admin/courses", course.getAllCourse);

router.post(
  "/",
  courseMiddleware.uploadCourseImage,
  course.createCourse
);
router
  .route("/:id")
  .put(courseMiddleware.uploadCourseImage, course.updateCourse)
  .delete(course.deleteCourse);

router
  .route("/:courseId/module")
  .post(courseMiddleware.uploadModuleVideo, courseModule.createModule)
  // .get(moduleController.getCourseAllModule);

router
  .route("/:courseId/module/:id")
  .put(courseModule.updateModule)
  .delete(courseModule.deleteModule);

module.exports = router;
