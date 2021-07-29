## Photo Filter

![Photo Filter App](https://github.com/Olga2157/photo-filter/blob/main/assets/img/screenshotPhotoFilter.png "Photo filter App")


### Short description:

Photo Filter is an app for improving images. 

The task was to implement functional requirements using JS.

**Functional options**

1. There are fields that display the value of the corresponding css filter. As you *move the slider, the value changes and the appearance of the image changes* in accordance with the change of the corresponding css filter.
2. When you click on the *Reset* button, the values ​​of all css filters are reset. The position of the sliders, the values ​​in the corresponding fields and the appearance of the image are returned to their original state.
3. When you click on the *Next picture* button, the next picture is loaded from the pictures folder located on Github. If custom filter values are set in the application, they are preserved when flipping through the images. The link to the picture is formed taking into account the time of day and the picture number.
4. *The images are scrolled in a circle:* after the last twentieth image, the first is loaded again.
5. *Images must match the current time of day:*
⋅⋅* 6:00 - 11:59 - morning
⋅⋅* 12:00 - 17:59 - day
⋅⋅* 18:00 - 23:59 - evening
⋅⋅* 00:00 - 5:59 - night
6. The *Load picture* button provides with the opportunity to select images from the user's computer. The selected image is displayed in the application. The proportions of the image are not distorted. If custom filter values ​​are set in the application, they are saved when a new image is loaded. The same image can be uploaded again.
7. When you click on the *Save picture* button, the image is downloaded to your computer in its original size (in px) in the .png format. Images are downloaded with the added filters.
8. There is an opportunity to view the app on *full screen*.

Useful links: 
⋅⋅⋅[Technical requirements](https://rolling-scopes-school.github.io/stage0/#/stage1/tasks/js-projects/photo-filter)
⋅⋅⋅[Folder with images](https://github.com/rolling-scopes-school/stage1-tasks/tree/assets/images)


### Language: 
**Vanilla JavaScript**

### Key skills:

1. loading local files into the application
2. saving files to the user's computer
3. working with dates
4. working with the Canvas API
5. implementation Fullscreen


**Demo**: https://rolling-scopes-school.github.io/olga2157-JSFE2021Q1/photo-filter