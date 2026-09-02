export type ExerciseInfo = {
  steps: string[];
  videoQuery: string;
  /** Start/end position demo photos, from the public-domain free-exercise-db dataset. */
  images?: string[];
};

function ytEmbedUrl(query: string): string {
  return `https://www.youtube.com/embed?listType=search&list=${encodeURIComponent(
    query + " proper form tutorial"
  )}`;
}

const backSquat: ExerciseInfo = {
  steps: [
      "This exercise is best performed inside a squat rack for safety purposes. To begin, first set the bar on a rack to just below shoulder level. Once the correct height is chosen and the bar is loaded, step under the bar and place the back of your shoulders (slightly below the neck) across it.",
      "Hold on to the bar using both arms at each side and lift it off the rack by first pushing with your legs and at the same time straightening your torso.",
      "Step away from the rack and position your legs using a shoulder width medium stance with the toes slightly pointed out. Keep your head up at all times and also maintain a straight back. This will be your starting position. (Note: For the purposes of this discussion we will use the medium stance described above which targets overall development; however you can choose any of the three stances discussed in the foot stances section).",
      "Begin to slowly lower the bar by bending the knees and hips as you maintain a straight posture with the head up. Continue down until the angle between the upper leg and the calves becomes slightly less than 90-degrees. Inhale as you perform this portion of the movement. Tip: If you performed the exercise correctly, the front of the knees should make an imaginary straight line with the toes that is perpendicular to the front. If your knees are past that imaginary line (if they are past your toes) then you are placing undue stress on the knee and the exercise has been performed incorrectly.",
      "Begin to raise the bar as you exhale by pushing the floor with the heel of your foot as you straighten the legs again and go back to the starting position.",
      "Repeat for the recommended amount of repetitions.",
    ],
  videoQuery: "Barbell Squat",
  images: ["https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Barbell_Squat/0.jpg", "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Barbell_Squat/1.jpg"],
};

const gobletSquat: ExerciseInfo = {
  steps: [
      "Stand holding a light kettlebell by the horns close to your chest. This will be your starting position.",
      "Squat down between your legs until your hamstrings are on your calves. Keep your chest and head up and your back straight.",
      "At the bottom position, pause and use your elbows to push your knees out. Return to the starting position, and repeat for 10-20 repetitions.",
    ],
  videoQuery: "Goblet Squat",
  images: ["https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Goblet_Squat/0.jpg", "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Goblet_Squat/1.jpg"],
};

const bulgarianSplitSquat: ExerciseInfo = {
  steps: [
      "Position yourself into a staggered stance with the rear foot elevated and front foot forward.",
      "Hold a dumbbell in each hand, letting them hang at the sides. This will be your starting position.",
      "Begin by descending, flexing your knee and hip to lower your body down. Maintain good posture througout the movement. Keep the front knee in line with the foot as you perform the exercise.",
      "At the bottom of the movement, drive through the heel to extend the knee and hip to return to the starting position.",
    ],
  videoQuery: "Split Squat with Dumbbells",
  images: ["https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Split_Squat_with_Dumbbells/0.jpg", "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Split_Squat_with_Dumbbells/1.jpg"],
};

const legPress: ExerciseInfo = {
  steps: [
      "Using a leg press machine, sit down on the machine and place your legs on the platform directly in front of you at a medium (shoulder width) foot stance. (Note: For the purposes of this discussion we will use the medium stance described above which targets overall development; however you can choose any of the three stances described in the foot positioning section).",
      "Lower the safety bars holding the weighted platform in place and press the platform all the way up until your legs are fully extended in front of you. Tip: Make sure that you do not lock your knees. Your torso and the legs should make a perfect 90-degree angle. This will be your starting position.",
      "As you inhale, slowly lower the platform until your upper and lower legs make a 90-degree angle.",
      "Pushing mainly with the heels of your feet and using the quadriceps go back to the starting position as you exhale.",
      "Repeat for the recommended amount of repetitions and ensure to lock the safety pins properly once you are done. You do not want that platform falling on you fully loaded.",
    ],
  videoQuery: "Leg Press",
  images: ["https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Leg_Press/0.jpg", "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Leg_Press/1.jpg"],
};

const walkingLunges: ExerciseInfo = {
  steps: [
      "Begin standing with your feet shoulder width apart and your hands on your hips.",
      "Step forward with one leg, flexing the knees to drop your hips. Descend until your rear knee nearly touches the ground. Your posture should remain upright, and your front knee should stay above the front foot.",
      "Drive through the heel of your lead foot and extend both knees to raise yourself back up.",
      "Step forward with your rear foot, repeating the lunge on the opposite leg.",
    ],
  videoQuery: "Bodyweight Walking Lunge",
  images: ["https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Bodyweight_Walking_Lunge/0.jpg", "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Bodyweight_Walking_Lunge/1.jpg"],
};

const romanianDeadlift: ExerciseInfo = {
  steps: [
      "Put a barbell in front of you on the ground and grab it using a pronated (palms facing down) grip that a little wider than shoulder width. Tip: Depending on the weight used, you may need wrist wraps to perform the exercise and also a raised platform in order to allow for better range of motion.",
      "Bend the knees slightly and keep the shins vertical, hips back and back straight. This will be your starting position.",
      "Keeping your back and arms completely straight at all times, use your hips to lift the bar as you exhale. Tip: The movement should not be fast but steady and under control.",
      "Once you are standing completely straight up, lower the bar by pushing the hips back, only slightly bending the knees, unlike when squatting. Tip: Take a deep breath at the start of the movement and keep your chest up. Hold your breath as you lower and exhale as you complete the movement.",
      "Repeat for the recommended amount of repetitions.",
    ],
  videoQuery: "Romanian Deadlift",
  images: ["https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Romanian_Deadlift/0.jpg", "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Romanian_Deadlift/1.jpg"],
};

const deadlift: ExerciseInfo = {
  steps: [
      "Stand in front of a loaded barbell.",
      "While keeping the back as straight as possible, bend your knees, bend forward and grasp the bar using a medium (shoulder width) overhand grip. This will be the starting position of the exercise. Tip: If it is difficult to hold on to the bar with this grip, alternate your grip or use wrist straps.",
      "While holding the bar, start the lift by pushing with your legs while simultaneously getting your torso to the upright position as you breathe out. In the upright position, stick your chest out and contract the back by bringing the shoulder blades back. Think of how the soldiers in the military look when they are in standing in attention.",
      "Go back to the starting position by bending at the knees while simultaneously leaning the torso forward at the waist while keeping the back straight. When the weights on the bar touch the floor you are back at the starting position and ready to perform another repetition.",
      "Perform the amount of repetitions prescribed in the program.",
    ],
  videoQuery: "Barbell Deadlift",
  images: ["https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Barbell_Deadlift/0.jpg", "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Barbell_Deadlift/1.jpg"],
};

const legCurlLying: ExerciseInfo = {
  steps: [
      "Adjust the machine lever to fit your height and lie face down on the leg curl machine with the pad of the lever on the back of your legs (just a few inches under the calves). Tip: Preferably use a leg curl machine that is angled as opposed to flat since an angled position is more favorable for hamstrings recruitment.",
      "Keeping the torso flat on the bench, ensure your legs are fully stretched and grab the side handles of the machine. Position your toes straight (or you can also use any of the other two stances described on the foot positioning section). This will be your starting position.",
      "As you exhale, curl your legs up as far as possible without lifting the upper legs from the pad. Once you hit the fully contracted position, hold it for a second.",
      "As you inhale, bring the legs back to the initial position. Repeat for the recommended amount of repetitions.",
    ],
  videoQuery: "Lying Leg Curls",
  images: ["https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Lying_Leg_Curls/0.jpg", "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Lying_Leg_Curls/1.jpg"],
};

const legCurlSeated: ExerciseInfo = {
  steps: [
      "Adjust the machine lever to fit your height and sit on the machine with your back against the back support pad.",
      "Place the back of lower leg on top of padded lever (just a few inches under the calves) and secure the lap pad against your thighs, just above the knees. Then grasp the side handles on the machine as you point your toes straight (or you can also use any of the other two stances) and ensure that the legs are fully straight right in front of you. This will be your starting position.",
      "As you exhale, pull the machine lever as far as possible to the back of your thighs by flexing at the knees. Keep your torso stationary at all times. Hold the contracted position for a second.",
      "Slowly return to the starting position as you breathe in.",
      "Repeat for the recommended amount of repetitions.",
    ],
  videoQuery: "Seated Leg Curl",
  images: ["https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Seated_Leg_Curl/0.jpg", "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Seated_Leg_Curl/1.jpg"],
};

const legExtension: ExerciseInfo = {
  steps: [
      "For this exercise you will need to use a leg extension machine. First choose your weight and sit on the machine with your legs under the pad (feet pointed forward) and the hands holding the side bars. This will be your starting position. Tip: You will need to adjust the pad so that it falls on top of your lower leg (just above your feet). Also, make sure that your legs form a 90-degree angle between the lower and upper leg. If the angle is less than 90-degrees then that means the knee is over the toes which in turn creates undue stress at the knee joint. If the machine is designed that way, either look for another machine or just make sure that when you start executing the exercise you stop going down once you hit the 90-degree angle.",
      "Using your quadriceps, extend your legs to the maximum as you exhale. Ensure that the rest of the body remains stationary on the seat. Pause a second on the contracted position.",
      "Slowly lower the weight back to the original position as you inhale, ensuring that you do not go past the 90-degree angle limit.",
      "Repeat for the recommended amount of times.",
    ],
  videoQuery: "Leg Extensions",
  images: ["https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Leg_Extensions/0.jpg", "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Leg_Extensions/1.jpg"],
};

const standingCalfRaises: ExerciseInfo = {
  steps: [
      "Adjust the padded lever of the calf raise machine to fit your height.",
      "Place your shoulders under the pads provided and position your toes facing forward (or using any of the two other positions described at the beginning of the chapter). The balls of your feet should be secured on top of the calf block with the heels extending off it. Push the lever up by extending your hips and knees until your torso is standing erect. The knees should be kept with a slight bend; never locked. Toes should be facing forward, outwards or inwards as described at the beginning of the chapter. This will be your starting position.",
      "Raise your heels as you breathe out by extending your ankles as high as possible and flexing your calf. Ensure that the knee is kept stationary at all times. There should be no bending at any time. Hold the contracted position by a second before you start to go back down.",
      "Go back slowly to the starting position as you breathe in by lowering your heels as you bend the ankles until calves are stretched.",
      "Repeat for the recommended amount of repetitions.",
    ],
  videoQuery: "Standing Calf Raises",
  images: ["https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Standing_Calf_Raises/0.jpg", "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Standing_Calf_Raises/1.jpg"],
};

const seatedCalfRaises: ExerciseInfo = {
  steps: [
      "Sit on the machine and place your toes on the lower portion of the platform provided with the heels extending off. Choose the toe positioning of your choice (forward, in, or out) as per the beginning of this chapter.",
      "Place your lower thighs under the lever pad, which will need to be adjusted according to the height of your thighs. Now place your hands on top of the lever pad in order to prevent it from slipping forward.",
      "Lift the lever slightly by pushing your heels up and release the safety bar. This will be your starting position.",
      "Slowly lower your heels by bending at the ankles until the calves are fully stretched. Inhale as you perform this movement.",
      "Raise the heels by extending the ankles as high as possible as you contract the calves and breathe out. Hold the top contraction for a second.",
      "Repeat for the recommended amount of repetitions.",
    ],
  videoQuery: "Seated Calf Raise",
  images: ["https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Seated_Calf_Raise/0.jpg", "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Seated_Calf_Raise/1.jpg"],
};

const hipThrust: ExerciseInfo = {
  steps: [
      "Begin seated on the ground with a bench directly behind you. Have a loaded barbell over your legs. Using a fat bar or having a pad on the bar can greatly reduce the discomfort caused by this exercise.",
      "Roll the bar so that it is directly above your hips, and lean back against the bench so that your shoulder blades are near the top of it.",
      "Begin the movement by driving through your feet, extending your hips vertically through the bar. Your weight should be supported by your shoulder blades and your feet. Extend as far as possible, then reverse the motion to return to the starting position.",
    ],
  videoQuery: "Barbell Hip Thrust",
  images: ["https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Barbell_Hip_Thrust/0.jpg", "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Barbell_Hip_Thrust/1.jpg"],
};

const barbellBenchPress: ExerciseInfo = {
  steps: [
      "Lie back on a flat bench. Using a medium width grip (a grip that creates a 90-degree angle in the middle of the movement between the forearms and the upper arms), lift the bar from the rack and hold it straight over you with your arms locked. This will be your starting position.",
      "From the starting position, breathe in and begin coming down slowly until the bar touches your middle chest.",
      "After a brief pause, push the bar back to the starting position as you breathe out. Focus on pushing the bar using your chest muscles. Lock your arms and squeeze your chest in the contracted position at the top of the motion, hold for a second and then start coming down slowly again. Tip: Ideally, lowering the weight should take about twice as long as raising it.",
      "Repeat the movement for the prescribed amount of repetitions.",
      "When you are done, place the bar back in the rack.",
    ],
  videoQuery: "Barbell Bench Press - Medium Grip",
  images: ["https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Barbell_Bench_Press_-_Medium_Grip/0.jpg", "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Barbell_Bench_Press_-_Medium_Grip/1.jpg"],
};

const dumbbellBenchPress: ExerciseInfo = {
  steps: [
      "Lie down on a flat bench with a dumbbell in each hand resting on top of your thighs. The palms of your hands will be facing each other.",
      "Then, using your thighs to help raise the dumbbells up, lift the dumbbells one at a time so that you can hold them in front of you at shoulder width.",
      "Once at shoulder width, rotate your wrists forward so that the palms of your hands are facing away from you. The dumbbells should be just to the sides of your chest, with your upper arm and forearm creating a 90 degree angle. Be sure to maintain full control of the dumbbells at all times. This will be your starting position.",
      "Then, as you breathe out, use your chest to push the dumbbells up. Lock your arms at the top of the lift and squeeze your chest, hold for a second and then begin coming down slowly. Tip: Ideally, lowering the weight should take about twice as long as raising it.",
      "Repeat the movement for the prescribed amount of repetitions of your training program.",
    ],
  videoQuery: "Dumbbell Bench Press",
  images: ["https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Dumbbell_Bench_Press/0.jpg", "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Dumbbell_Bench_Press/1.jpg"],
};

const inclineBarbellPress: ExerciseInfo = {
  steps: [
      "Lie back on an incline bench. Using a medium-width grip (a grip that creates a 90-degree angle in the middle of the movement between the forearms and the upper arms), lift the bar from the rack and hold it straight over you with your arms locked. This will be your starting position.",
      "As you breathe in, come down slowly until you feel the bar on you upper chest.",
      "After a second pause, bring the bar back to the starting position as you breathe out and push the bar using your chest muscles. Lock your arms in the contracted position, squeeze your chest, hold for a second and then start coming down slowly again. Tip: it should take at least twice as long to go down than to come up.",
      "Repeat the movement for the prescribed amount of repetitions.",
      "When you are done, place the bar back in the rack.",
    ],
  videoQuery: "Barbell Incline Bench Press - Medium Grip",
  images: ["https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Barbell_Incline_Bench_Press_-_Medium_Grip/0.jpg", "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Barbell_Incline_Bench_Press_-_Medium_Grip/1.jpg"],
};

const inclineDumbbellPress: ExerciseInfo = {
  steps: [
      "Lie back on an incline bench with a dumbbell in each hand atop your thighs. The palms of your hands will be facing each other.",
      "Then, using your thighs to help push the dumbbells up, lift the dumbbells one at a time so that you can hold them at shoulder width.",
      "Once you have the dumbbells raised to shoulder width, rotate your wrists forward so that the palms of your hands are facing away from you. This will be your starting position.",
      "Be sure to keep full control of the dumbbells at all times. Then breathe out and push the dumbbells up with your chest.",
      "Lock your arms at the top, hold for a second, and then start slowly lowering the weight. Tip Ideally, lowering the weights should take about twice as long as raising them.",
      "Repeat the movement for the prescribed amount of repetitions.",
      "When you are done, place the dumbbells back on your thighs and then on the floor. This is the safest manner to release the dumbbells.",
    ],
  videoQuery: "Incline Dumbbell Press",
  images: ["https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Incline_Dumbbell_Press/0.jpg", "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Incline_Dumbbell_Press/1.jpg"],
};

const chestFly: ExerciseInfo = {
  steps: [
      "Lie down on a flat bench with a dumbbell on each hand resting on top of your thighs. The palms of your hand will be facing each other.",
      "Then using your thighs to help raise the dumbbells, lift the dumbbells one at a time so you can hold them in front of you at shoulder width with the palms of your hands facing each other. Raise the dumbbells up like you're pressing them, but stop and hold just before you lock out. This will be your starting position.",
      "With a slight bend on your elbows in order to prevent stress at the biceps tendon, lower your arms out at both sides in a wide arc until you feel a stretch on your chest. Breathe in as you perform this portion of the movement. Tip: Keep in mind that throughout the movement, the arms should remain stationary; the movement should only occur at the shoulder joint.",
      "Return your arms back to the starting position as you squeeze your chest muscles and breathe out. Tip: Make sure to use the same arc of motion used to lower the weights.",
      "Hold for a second at the contracted position and repeat the movement for the prescribed amount of repetitions.",
    ],
  videoQuery: "Dumbbell Flyes",
  images: ["https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Dumbbell_Flyes/0.jpg", "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Dumbbell_Flyes/1.jpg"],
};

const latPulldown: ExerciseInfo = {
  steps: [
      "Sit down on a pull-down machine with a wide bar attached to the top pulley. Make sure that you adjust the knee pad of the machine to fit your height. These pads will prevent your body from being raised by the resistance attached to the bar.",
      "Grab the bar with the palms facing forward using the prescribed grip. Note on grips: For a wide grip, your hands need to be spaced out at a distance wider than shoulder width. For a medium grip, your hands need to be spaced out at a distance equal to your shoulder width and for a close grip at a distance smaller than your shoulder width.",
      "As you have both arms extended in front of you holding the bar at the chosen grip width, bring your torso back around 30 degrees or so while creating a curvature on your lower back and sticking your chest out. This is your starting position.",
      "As you breathe out, bring the bar down until it touches your upper chest by drawing the shoulders and the upper arms down and back. Tip: Concentrate on squeezing the back muscles once you reach the full contracted position. The upper torso should remain stationary and only the arms should move. The forearms should do no other work except for holding the bar; therefore do not try to pull down the bar using the forearms.",
      "After a second at the contracted position squeezing your shoulder blades together, slowly raise the bar back to the starting position when your arms are fully extended and the lats are fully stretched. Inhale during this portion of the movement.",
      "Repeat this motion for the prescribed amount of repetitions.",
    ],
  videoQuery: "Wide-Grip Lat Pulldown",
  images: ["https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Wide-Grip_Lat_Pulldown/0.jpg", "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Wide-Grip_Lat_Pulldown/1.jpg"],
};

const seatedCableRow: ExerciseInfo = {
  steps: [
      "For this exercise you will need access to a low pulley row machine with a V-bar. Note: The V-bar will enable you to have a neutral grip where the palms of your hands face each other. To get into the starting position, first sit down on the machine and place your feet on the front platform or crossbar provided making sure that your knees are slightly bent and not locked.",
      "Lean over as you keep the natural alignment of your back and grab the V-bar handles.",
      "With your arms extended pull back until your torso is at a 90-degree angle from your legs. Your back should be slightly arched and your chest should be sticking out. You should be feeling a nice stretch on your lats as you hold the bar in front of you. This is the starting position of the exercise.",
      "Keeping the torso stationary, pull the handles back towards your torso while keeping the arms close to it until you touch the abdominals. Breathe out as you perform that movement. At that point you should be squeezing your back muscles hard. Hold that contraction for a second and slowly go back to the original position while breathing in.",
      "Repeat for the recommended amount of repetitions.",
    ],
  videoQuery: "Seated Cable Rows",
  images: ["https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Seated_Cable_Rows/0.jpg", "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Seated_Cable_Rows/1.jpg"],
};

const chestSupportedRow: ExerciseInfo = {
  steps: [
      "Using a neutral grip, lean into an incline bench.",
      "Take a dumbbell in each hand with a neutral grip, beginning with the arms straight. This will be your starting position.",
      "Retract the shoulder blades and flex the elbows to row the dumbbells to your side.",
      "Pause at the top of the motion, and then return to the starting position.",
    ],
  videoQuery: "Dumbbell Incline Row",
  images: ["https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Dumbbell_Incline_Row/0.jpg", "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Dumbbell_Incline_Row/1.jpg"],
};

const barbellRow: ExerciseInfo = {
  steps: [
      "Holding a barbell with a pronated grip (palms facing down), bend your knees slightly and bring your torso forward, by bending at the waist, while keeping the back straight until it is almost parallel to the floor. Tip: Make sure that you keep the head up. The barbell should hang directly in front of you as your arms hang perpendicular to the floor and your torso. This is your starting position.",
      "Now, while keeping the torso stationary, breathe out and lift the barbell to you. Keep the elbows close to the body and only use the forearms to hold the weight. At the top contracted position, squeeze the back muscles and hold for a brief pause.",
      "Then inhale and slowly lower the barbell back to the starting position.",
      "Repeat for the recommended amount of repetitions.",
    ],
  videoQuery: "Bent Over Barbell Row",
  images: ["https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Bent_Over_Barbell_Row/0.jpg", "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Bent_Over_Barbell_Row/1.jpg"],
};

const oneArmDbRow: ExerciseInfo = {
  steps: [
      "Choose a flat bench and place a dumbbell on each side of it.",
      "Place the right leg on top of the end of the bench, bend your torso forward from the waist until your upper body is parallel to the floor, and place your right hand on the other end of the bench for support.",
      "Use the left hand to pick up the dumbbell on the floor and hold the weight while keeping your lower back straight. The palm of the hand should be facing your torso. This will be your starting position.",
      "Pull the resistance straight up to the side of your chest, keeping your upper arm close to your side and keeping the torso stationary. Breathe out as you perform this step. Tip: Concentrate on squeezing the back muscles once you reach the full contracted position. Also, make sure that the force is performed with the back muscles and not the arms. Finally, the upper torso should remain stationary and only the arms should move. The forearms should do no other work except for holding the dumbbell; therefore do not try to pull the dumbbell up using the forearms.",
      "Lower the resistance straight down to the starting position. Breathe in as you perform this step.",
      "Repeat the movement for the specified amount of repetitions.",
      "Switch sides and repeat again with the other arm.",
    ],
  videoQuery: "One-Arm Dumbbell Row",
  images: ["https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/One-Arm_Dumbbell_Row/0.jpg", "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/One-Arm_Dumbbell_Row/1.jpg"],
};

const straightArmPulldown: ExerciseInfo = {
  steps: [
      "You will start by grabbing the wide bar from the top pulley of a pulldown machine and using a wider than shoulder-width pronated (palms down) grip. Step backwards two feet or so.",
      "Bend your torso forward at the waist by around 30-degrees with your arms fully extended in front of you and a slight bend at the elbows. If your arms are not fully extended then you need to step a bit more backwards until they are. Once your arms are fully extended and your torso is slightly bent at the waist, tighten the lats and then you are ready to begin.",
      "While keeping the arms straight, pull the bar down by contracting the lats until your hands are next to the side of the thighs. Breathe out as you perform this step.",
      "While keeping the arms straight, go back to the starting position while breathing in.",
      "Repeat for the recommended amount of repetitions.",
    ],
  videoQuery: "Straight-Arm Pulldown",
  images: ["https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Straight-Arm_Pulldown/0.jpg", "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Straight-Arm_Pulldown/1.jpg"],
};

const facePulls: ExerciseInfo = {
  steps: [
      "Facing a high pulley with a rope or dual handles attached, pull the weight directly towards your face, separating your hands as you do so. Keep your upper arms parallel to the ground.",
    ],
  videoQuery: "Face Pull",
  images: ["https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Face_Pull/0.jpg", "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Face_Pull/1.jpg"],
};

const seatedShoulderPress: ExerciseInfo = {
  steps: [
      "While holding a dumbbell in each hand, sit on a military press bench or utility bench that has back support. Place the dumbbells upright on top of your thighs.",
      "Now raise the dumbbells to shoulder height one at a time using your thighs to help propel them up into position.",
      "Make sure to rotate your wrists so that the palms of your hands are facing forward. This is your starting position.",
      "Now, exhale and push the dumbbells upward until they touch at the top.",
      "Then, after a brief pause at the top contracted position, slowly lower the weights back down to the starting position while inhaling.",
      "Repeat for the recommended amount of repetitions.",
    ],
  videoQuery: "Dumbbell Shoulder Press",
  images: ["https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Dumbbell_Shoulder_Press/0.jpg", "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Dumbbell_Shoulder_Press/1.jpg"],
};

const shoulderPress: ExerciseInfo = {
  steps: [
      "Sit on a bench with back support in a squat rack. Position a barbell at a height that is just above your head. Grab the barbell with a pronated grip (palms facing forward).",
      "Once you pick up the barbell with the correct grip width, lift the bar up over your head by locking your arms. Hold at about shoulder level and slightly in front of your head. This is your starting position.",
      "Lower the bar down to the shoulders slowly as you inhale.",
      "Lift the bar back up to the starting position as you exhale.",
      "Repeat for the recommended amount of repetitions.",
    ],
  videoQuery: "Barbell Shoulder Press",
  images: ["https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Barbell_Shoulder_Press/0.jpg", "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Barbell_Shoulder_Press/1.jpg"],
};

const lateralRaises: ExerciseInfo = {
  steps: [
      "Pick a couple of dumbbells and stand with a straight torso and the dumbbells by your side at arms length with the palms of the hand facing you. This will be your starting position.",
      "While maintaining the torso in a stationary position (no swinging), lift the dumbbells to your side with a slight bend on the elbow and the hands slightly tilted forward as if pouring water in a glass. Continue to go up until you arms are parallel to the floor. Exhale as you execute this movement and pause for a second at the top.",
      "Lower the dumbbells back down slowly to the starting position as you inhale.",
      "Repeat for the recommended amount of repetitions.",
    ],
  videoQuery: "Side Lateral Raise",
  images: ["https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Side_Lateral_Raise/0.jpg", "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Side_Lateral_Raise/1.jpg"],
};

const frontRaises: ExerciseInfo = {
  steps: [
      "Pick a couple of dumbbells and stand with a straight torso and the dumbbells on front of your thighs at arms length with the palms of the hand facing your thighs. This will be your starting position.",
      "While maintaining the torso stationary (no swinging), lift the left dumbbell to the front with a slight bend on the elbow and the palms of the hands always facing down. Continue to go up until you arm is slightly above parallel to the floor. Exhale as you execute this portion of the movement and pause for a second at the top. Inhale after the second pause.",
      "Now lower the dumbbell back down slowly to the starting position as you simultaneously lift the right dumbbell.",
      "Continue alternating in this fashion until all of the recommended amount of repetitions have been performed for each arm.",
    ],
  videoQuery: "Front Dumbbell Raise",
  images: ["https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Front_Dumbbell_Raise/0.jpg", "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Front_Dumbbell_Raise/1.jpg"],
};

const rearDeltFly: ExerciseInfo = {
  steps: [
      "Adjust the pulleys to the appropriate height and adjust the weight. The pulleys should be above your head.",
      "Grab the left pulley with your right hand and the right pulley with your left hand, crossing them in front of you. This will be your starting position.",
      "Initiate the movement by moving your arms back and outward, keeping your arms straight as you execute the movement.",
      "Pause at the end of the motion before returning the handles to the start position.",
    ],
  videoQuery: "Cable Rear Delt Fly",
  images: ["https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Cable_Rear_Delt_Fly/0.jpg", "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Cable_Rear_Delt_Fly/1.jpg"],
};

const barbellCurl: ExerciseInfo = {
  steps: [
      "Stand up with your torso upright while holding a barbell at a shoulder-width grip. The palm of your hands should be facing forward and the elbows should be close to the torso. This will be your starting position.",
      "While holding the upper arms stationary, curl the weights forward while contracting the biceps as you breathe out. Tip: Only the forearms should move.",
      "Continue the movement until your biceps are fully contracted and the bar is at shoulder level. Hold the contracted position for a second and squeeze the biceps hard.",
      "Slowly begin to bring the bar back to starting position as your breathe in.",
      "Repeat for the recommended amount of repetitions.",
    ],
  videoQuery: "Barbell Curl",
  images: ["https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Barbell_Curl/0.jpg", "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Barbell_Curl/1.jpg"],
};

const ezBarCurl: ExerciseInfo = {
  steps: [
      "Stand up straight while holding an EZ curl bar at the wide outer handle. The palms of your hands should be facing forward and slightly tilted inward due to the shape of the bar. Keep your elbows close to your torso. This will be your starting position.",
      "Now, while keeping your upper arms stationary, exhale and curl the weights forward while contracting the biceps. Focus on only moving your forearms.",
      "Continue to raise the weight until your biceps are fully contracted and the bar is at shoulder level. Hold the top contracted position for a moment and squeeze the biceps.",
      "Then inhale and slowly lower the bar back to the starting position.",
      "Repeat for the recommended amount of repetitions.",
    ],
  videoQuery: "EZ-Bar Curl",
  images: ["https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/EZ-Bar_Curl/0.jpg", "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/EZ-Bar_Curl/1.jpg"],
};

const hammerCurl: ExerciseInfo = {
  steps: [
      "Stand up with your torso upright and a dumbbell on each hand being held at arms length. The elbows should be close to the torso.",
      "The palms of the hands should be facing your torso. This will be your starting position.",
      "Now, while holding your upper arm stationary, exhale and curl the weight forward while contracting the biceps. Continue to raise the weight until the biceps are fully contracted and the dumbbell is at shoulder level. Hold the contracted position for a brief moment as you squeeze the biceps. Tip: Focus on keeping the elbow stationary and only moving your forearm.",
      "After the brief pause, inhale and slowly begin the lower the dumbbells back down to the starting position.",
      "Repeat for the recommended amount of repetitions.",
    ],
  videoQuery: "Hammer Curls",
  images: ["https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Hammer_Curls/0.jpg", "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Hammer_Curls/1.jpg"],
};

const tricepsPushdown: ExerciseInfo = {
  steps: [
      "Attach a straight or angled bar to a high pulley and grab with an overhand grip (palms facing down) at shoulder width.",
      "Standing upright with the torso straight and a very small inclination forward, bring the upper arms close to your body and perpendicular to the floor. The forearms should be pointing up towards the pulley as they hold the bar. This is your starting position.",
      "Using the triceps, bring the bar down until it touches the front of your thighs and the arms are fully extended perpendicular to the floor. The upper arms should always remain stationary next to your torso and only the forearms should move. Exhale as you perform this movement.",
      "After a second hold at the contracted position, bring the bar slowly up to the starting point. Breathe in as you perform this step.",
      "Repeat for the recommended amount of repetitions.",
    ],
  videoQuery: "Triceps Pushdown",
  images: ["https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Triceps_Pushdown/0.jpg", "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Triceps_Pushdown/1.jpg"],
};

const overheadTricepsExtension: ExerciseInfo = {
  steps: [
      "To begin, stand up with a dumbbell held by both hands. Your feet should be about shoulder width apart from each other. Slowly use both hands to grab the dumbbell and lift it over your head until both arms are fully extended.",
      "The resistance should be resting in the palms of your hands with your thumbs around it. The palm of the hands should be facing up towards the ceiling. This will be your starting position.",
      "Keeping your upper arms close to your head with elbows in and perpendicular to the floor, lower the resistance in a semicircular motion behind your head until your forearms touch your biceps. Tip: The upper arms should remain stationary and only the forearms should move. Breathe in as you perform this step.",
      "Go back to the starting position by using the triceps to raise the dumbbell. Breathe out as you perform this step.",
      "Repeat for the recommended amount of repetitions.",
    ],
  videoQuery: "Standing Dumbbell Triceps Extension",
  images: ["https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Standing_Dumbbell_Triceps_Extension/0.jpg", "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Standing_Dumbbell_Triceps_Extension/1.jpg"],
};

const skullCrushers: ExerciseInfo = {
  steps: [
      "Using a close grip, lift the EZ bar and hold it with your elbows in as you lie on the bench. Your arms should be perpendicular to the floor. This will be your starting position.",
      "Keeping the upper arms stationary, lower the bar by allowing the elbows to flex. Inhale as you perform this portion of the movement. Pause once the bar is directly above the forehead.",
      "Lift the bar back to the starting position by extending the elbow and exhaling.",
      "Repeat.",
    ],
  videoQuery: "EZ-Bar Skullcrusher",
  images: ["https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/EZ-Bar_Skullcrusher/0.jpg", "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/EZ-Bar_Skullcrusher/1.jpg"],
};

const plank: ExerciseInfo = {
  steps: [
      "Get into a prone position on the floor, supporting your weight on your toes and your forearms. Your arms are bent and directly below the shoulder.",
      "Keep your body straight at all times, and hold this position as long as possible. To increase difficulty, an arm or leg can be raised.",
    ],
  videoQuery: "Plank",
  images: ["https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Plank/0.jpg", "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Plank/1.jpg"],
};

const hangingLegRaises: ExerciseInfo = {
  steps: [
      "Hang from a chin-up bar with both arms extended at arms length in top of you using either a wide grip or a medium grip. The legs should be straight down with the pelvis rolled slightly backwards. This will be your starting position.",
      "Raise your legs until the torso makes a 90-degree angle with the legs. Exhale as you perform this movement and hold the contraction for a second or so.",
      "Go back slowly to the starting position as you breathe in.",
      "Repeat for the recommended amount of repetitions.",
    ],
  videoQuery: "Hanging Leg Raise",
  images: ["https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Hanging_Leg_Raise/0.jpg", "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Hanging_Leg_Raise/1.jpg"],
};


const pushUps: ExerciseInfo = {
  steps: [
    "Hands slightly wider than shoulders, body in a straight line.",
    "Lower your chest toward the floor, elbows at ~45 degrees.",
    "Push back up to full arm extension.",
    "Keep core braced so hips do not sag.",
  ],
  videoQuery: "push up",
};

const pullUps: ExerciseInfo = {
  steps: [
    "Grip the bar just outside shoulder width, hang with arms extended.",
    "Pull yourself up until your chin clears the bar.",
    "Lead with your chest, elbows driving down and back.",
    "Lower back down under control to full arm extension.",
  ],
  videoQuery: "pull up",
};

const dumbbellCurls: ExerciseInfo = {
  steps: [
    "Stand tall, dumbbells at your sides, palms facing forward.",
    "Curl up, keeping elbows pinned to your sides.",
    "Squeeze biceps at the top.",
    "Lower with control back to full extension.",
  ],
  videoQuery: "dumbbell bicep curl",
};

const superset: ExerciseInfo = {
  steps: [
    "This is a superset: two exercises done back-to-back with no rest between them.",
    "Perform the prescribed reps of the first movement, then immediately move to the second.",
    "Rest only after completing both, then repeat for the next set.",
  ],
  videoQuery: "bicep curl triceps pushdown superset",
};

export const EXERCISE_LIBRARY: Record<string, ExerciseInfo> = {
  "Back Squat": backSquat,
  "Goblet Squat": gobletSquat,
  "Bulgarian Split Squat": bulgarianSplitSquat,
  "Leg Press": legPress,
  "Hack Squat / Leg Press": legPress,
  "Walking Lunges": walkingLunges,
  "Romanian Deadlift": romanianDeadlift,
  Deadlift: deadlift,
  "Barbell Deadlift": deadlift,
  "Leg Curl": legCurlLying,
  "Seated Leg Curl": legCurlSeated,
  "Lying Leg Curl": legCurlLying,
  "Leg Extension": legExtension,
  "Standing Calf Raises": standingCalfRaises,
  "Seated Calf Raises": seatedCalfRaises,
  "Hip Thrust": hipThrust,
  "Hip Thrust (DB/Barbell)": hipThrust,
  "Barbell Bench Press": barbellBenchPress,
  "Barbell / DB Bench Press": barbellBenchPress,
  "Dumbbell Bench Press": dumbbellBenchPress,
  "Incline Barbell Press": inclineBarbellPress,
  "Incline Bench Press": inclineBarbellPress,
  "Incline Dumbbell Press": inclineDumbbellPress,
  "Incline DB Press": inclineDumbbellPress,
  "Dumbbell Chest Fly": chestFly,
  "Cable Fly": chestFly,
  "Push-Ups (Optional Finisher)": pushUps,
  "Lat Pulldown": latPulldown,
  "Assisted Pull-ups / Pulldown": latPulldown,
  "Weighted Pull-ups / Lat Pulldown": latPulldown,
  "Pull-ups / Pulldown": latPulldown,
  "Pull-ups": pullUps,
  "Assisted Pull-ups": pullUps,
  "Seated Cable Row": seatedCableRow,
  "Cable Row": seatedCableRow,
  "Chest-Supported Row": chestSupportedRow,
  "Barbell Row": barbellRow,
  "One-Arm Dumbbell Row": oneArmDbRow,
  "One-Arm DB Row": oneArmDbRow,
  "Straight-Arm Pulldown": straightArmPulldown,
  "Face Pulls": facePulls,
  "Seated Dumbbell Shoulder Press": seatedShoulderPress,
  "Seated DB Shoulder Press": seatedShoulderPress,
  "Dumbbell Shoulder Press": seatedShoulderPress,
  "Shoulder Press": shoulderPress,
  "Seated Shoulder Press": shoulderPress,
  "Dumbbell Lateral Raises": lateralRaises,
  "Lateral Raises": lateralRaises,
  "Cable Lateral Raises": lateralRaises,
  "Front Raises": frontRaises,
  "Rear Delt Fly (Machine/DB)": rearDeltFly,
  "Barbell Curl": barbellCurl,
  "Barbell Curls": barbellCurl,
  "Biceps Curls": barbellCurl,
  "Dumbbell Curls": dumbbellCurls,
  "Dumbbell Curl": dumbbellCurls,
  "EZ-Bar Curl": ezBarCurl,
  "Dumbbell Hammer Curl": hammerCurl,
  "Triceps Pushdown": tricepsPushdown,
  "Triceps Rope Pushdown": tricepsPushdown,
  "Overhead Triceps Extension": overheadTricepsExtension,
  "Overhead Dumbbell Extension": overheadTricepsExtension,
  "Skull Crushers": skullCrushers,
  Plank: plank,
  "Hanging Leg Raises": hangingLegRaises,
  "Arms Superset": superset,
  "Superset: Curl + Pushdown": superset,
};

export function getExerciseInfo(name: string): ExerciseInfo | undefined {
  return EXERCISE_LIBRARY[name];
}

export function getExerciseVideoUrl(info: ExerciseInfo): string {
  return ytEmbedUrl(info.videoQuery);
}
