export type ExerciseInfo = {
  steps: string[];
  videoQuery: string;
};

function ytEmbedUrl(query: string): string {
  return `https://www.youtube.com/embed?listType=search&list=${encodeURIComponent(
    query + " proper form tutorial"
  )}`;
}

const backSquat: ExerciseInfo = {
  steps: [
    "Bar on upper traps, feet shoulder-width, toes slightly out.",
    "Brace core, break at hips and knees together, chest up.",
    "Squat until thighs are at least parallel to the floor.",
    "Drive through the whole foot to stand back up.",
  ],
  videoQuery: "barbell back squat",
};

const gobletSquat: ExerciseInfo = {
  steps: [
    "Hold one dumbbell vertically against your chest.",
    "Feet shoulder-width, toes slightly out.",
    "Squat down between your knees, elbows brushing thighs at the bottom.",
    "Drive up through your heels to standing.",
  ],
  videoQuery: "goblet squat",
};

const bulgarianSplitSquat: ExerciseInfo = {
  steps: [
    "Rear foot elevated on a bench, front foot far enough forward.",
    "Lower straight down until front thigh is near parallel.",
    "Keep torso upright, most weight through the front heel.",
    "Push through the front foot to return to standing.",
  ],
  videoQuery: "bulgarian split squat",
};

const legPress: ExerciseInfo = {
  steps: [
    "Sit in the machine, feet shoulder-width on the platform.",
    "Unrack, lower with control until knees reach ~90 degrees.",
    "Don't let knees cave in or lower back round off the pad.",
    "Press through the whole foot back to the start, don't lock knees hard.",
  ],
  videoQuery: "leg press machine",
};

const walkingLunges: ExerciseInfo = {
  steps: [
    "Stand tall, step forward into a long stride.",
    "Lower back knee toward the floor, front knee over the ankle.",
    "Push off the front foot into the next step.",
    "Keep torso upright and core braced throughout.",
  ],
  videoQuery: "walking lunges",
};

const romanianDeadlift: ExerciseInfo = {
  steps: [
    "Hold the bar/dumbbells at hip height, soft knee bend.",
    "Hinge at the hips, push hips back, bar stays close to legs.",
    "Lower until you feel a hamstring stretch, back stays flat.",
    "Drive hips forward to return to standing.",
  ],
  videoQuery: "romanian deadlift",
};

const deadlift: ExerciseInfo = {
  steps: [
    "Bar over mid-foot, grip just outside your shins.",
    "Flat back, chest up, hips down to start position.",
    "Push the floor away with your legs as the bar rises.",
    "Finish by standing tall, hips and knees locking out together.",
  ],
  videoQuery: "conventional deadlift",
};

const legCurl: ExerciseInfo = {
  steps: [
    "Set up on the machine with the pad above your heels.",
    "Curl the pad toward your glutes, squeezing hamstrings.",
    "Pause briefly at the top.",
    "Lower back down under control, don't let the weight drop.",
  ],
  videoQuery: "leg curl machine",
};

const legExtension: ExerciseInfo = {
  steps: [
    "Sit with the pad resting on your lower shins.",
    "Extend your legs to straighten your knees.",
    "Squeeze quads at the top briefly.",
    "Lower back down under control.",
  ],
  videoQuery: "leg extension machine",
};

const standingCalfRaises: ExerciseInfo = {
  steps: [
    "Balls of feet on the platform, heels hanging off.",
    "Lower heels down for a full stretch.",
    "Push up onto your toes as high as possible.",
    "Pause briefly, then lower with control.",
  ],
  videoQuery: "standing calf raise",
};

const seatedCalfRaises: ExerciseInfo = {
  steps: [
    "Sit with the pad across your lower thighs, balls of feet on the platform.",
    "Lower heels for a full stretch.",
    "Push up onto your toes.",
    "Pause, then lower with control.",
  ],
  videoQuery: "seated calf raise",
};

const hipThrust: ExerciseInfo = {
  steps: [
    "Upper back on a bench, bar/dumbbell over your hips.",
    "Feet flat, knees bent to about 90 degrees.",
    "Drive hips up until body forms a straight line, squeeze glutes.",
    "Lower back down under control without letting hips sag.",
  ],
  videoQuery: "barbell hip thrust",
};

const barbellBenchPress: ExerciseInfo = {
  steps: [
    "Lie on the bench, eyes under the bar, feet flat on the floor.",
    "Grip slightly wider than shoulders, unrack over your chest.",
    "Lower bar to mid-chest with elbows at ~45 degrees.",
    "Press back up to full lockout.",
  ],
  videoQuery: "barbell bench press",
};

const dumbbellBenchPress: ExerciseInfo = {
  steps: [
    "Lie on bench, a dumbbell in each hand at chest level.",
    "Press dumbbells up until arms are extended over your chest.",
    "Lower with control until upper arms are about parallel to the floor.",
    "Keep shoulder blades pinned to the bench throughout.",
  ],
  videoQuery: "dumbbell bench press",
};

const inclineBarbellPress: ExerciseInfo = {
  steps: [
    "Set bench to a 30-45 degree incline.",
    "Unrack the bar over your upper chest.",
    "Lower to your upper chest, elbows at ~45 degrees.",
    "Press back up to lockout.",
  ],
  videoQuery: "incline barbell bench press",
};

const inclineDumbbellPress: ExerciseInfo = {
  steps: [
    "Set bench to a 30-45 degree incline, dumbbells at shoulder level.",
    "Press dumbbells up and slightly in until arms extend.",
    "Lower with control to shoulder level.",
    "Keep shoulder blades pinned to the bench throughout.",
  ],
  videoQuery: "incline dumbbell press",
};

const chestFly: ExerciseInfo = {
  steps: [
    "Set up lying on a bench (dumbbells) or standing between cables.",
    "Start with arms extended out to the sides, slight elbow bend.",
    "Bring hands together in an arcing motion over your chest.",
    "Return slowly to the stretched starting position.",
  ],
  videoQuery: "chest fly",
};

const pushUps: ExerciseInfo = {
  steps: [
    "Hands slightly wider than shoulders, body in a straight line.",
    "Lower your chest toward the floor, elbows at ~45 degrees.",
    "Push back up to full arm extension.",
    "Keep core braced so hips don't sag.",
  ],
  videoQuery: "push up",
};

const latPulldown: ExerciseInfo = {
  steps: [
    "Grip the bar wider than shoulders, sit with thighs locked under the pad.",
    "Pull the bar down to your upper chest, driving elbows down and back.",
    "Squeeze shoulder blades together at the bottom.",
    "Let the bar rise back up under control.",
  ],
  videoQuery: "lat pulldown",
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

const seatedCableRow: ExerciseInfo = {
  steps: [
    "Sit with knees slightly bent, grip the handle, back straight.",
    "Pull the handle to your lower abdomen, elbows close to your body.",
    "Squeeze shoulder blades together at the finish.",
    "Extend arms back out under control.",
  ],
  videoQuery: "seated cable row",
};

const chestSupportedRow: ExerciseInfo = {
  steps: [
    "Chest against the pad, arms hanging with a dumbbell/handle in each hand.",
    "Row elbows back and up, squeezing shoulder blades together.",
    "Pause briefly at the top.",
    "Lower with control to full arm extension.",
  ],
  videoQuery: "chest supported row",
};

const barbellRow: ExerciseInfo = {
  steps: [
    "Hinge at the hips to about 45 degrees, flat back, bar hanging.",
    "Pull the bar to your lower ribs/upper abdomen.",
    "Squeeze shoulder blades together at the top.",
    "Lower under control without rounding your back.",
  ],
  videoQuery: "barbell row",
};

const oneArmDbRow: ExerciseInfo = {
  steps: [
    "One knee and hand on a bench, back flat and parallel to the floor.",
    "Row the dumbbell up toward your hip, elbow close to your body.",
    "Squeeze at the top.",
    "Lower with control to full arm extension.",
  ],
  videoQuery: "one arm dumbbell row",
};

const straightArmPulldown: ExerciseInfo = {
  steps: [
    "Stand facing a high cable, arms extended, slight elbow bend.",
    "Keeping arms straight, pull the bar down to your thighs.",
    "Squeeze your lats at the bottom.",
    "Let the bar rise back up under control.",
  ],
  videoQuery: "straight arm pulldown",
};

const facePulls: ExerciseInfo = {
  steps: [
    "Set a cable at upper-chest/head height with a rope attachment.",
    "Pull the rope toward your face, splitting hands apart.",
    "Squeeze shoulder blades together, elbows high.",
    "Return with control to the start.",
  ],
  videoQuery: "face pulls",
};

const seatedShoulderPress: ExerciseInfo = {
  steps: [
    "Seated or standing, dumbbells/bar at shoulder height.",
    "Press straight overhead until arms are extended.",
    "Avoid excessive lower back arch.",
    "Lower back down to shoulder height under control.",
  ],
  videoQuery: "seated dumbbell shoulder press",
};

const shoulderPress: ExerciseInfo = {
  steps: [
    "Stand or sit tall, weight at shoulder height.",
    "Press straight up overhead to full lockout.",
    "Keep core braced, avoid leaning back.",
    "Lower back down under control.",
  ],
  videoQuery: "overhead shoulder press",
};

const lateralRaises: ExerciseInfo = {
  steps: [
    "Stand holding dumbbells/handles at your sides, slight elbow bend.",
    "Raise arms out to the sides until about shoulder height.",
    "Lead with your elbows, not your hands.",
    "Lower with control back to your sides.",
  ],
  videoQuery: "dumbbell lateral raise",
};

const frontRaises: ExerciseInfo = {
  steps: [
    "Stand holding dumbbells in front of your thighs.",
    "Raise one or both arms straight in front to shoulder height.",
    "Keep a slight elbow bend, avoid swinging.",
    "Lower with control back to the start.",
  ],
  videoQuery: "front raises",
};

const rearDeltFly: ExerciseInfo = {
  steps: [
    "Hinge forward at the hips, dumbbells hanging or use a machine.",
    "Raise arms out to the sides, squeezing shoulder blades together.",
    "Keep a slight elbow bend throughout.",
    "Lower with control back to the start.",
  ],
  videoQuery: "rear delt fly",
};

const barbellCurl: ExerciseInfo = {
  steps: [
    "Stand tall, grip the bar shoulder-width, arms extended.",
    "Curl the bar up, keeping elbows pinned to your sides.",
    "Squeeze biceps at the top.",
    "Lower with control back to full extension.",
  ],
  videoQuery: "barbell curl",
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

const ezBarCurl: ExerciseInfo = {
  steps: [
    "Grip the EZ-bar on the angled sections, elbows at your sides.",
    "Curl the bar up without swinging your torso.",
    "Squeeze biceps at the top.",
    "Lower with control back to full extension.",
  ],
  videoQuery: "ez bar curl",
};

const hammerCurl: ExerciseInfo = {
  steps: [
    "Stand tall, dumbbells at your sides, palms facing each other.",
    "Curl up keeping that neutral grip and elbows pinned to your sides.",
    "Squeeze at the top.",
    "Lower with control back to full extension.",
  ],
  videoQuery: "dumbbell hammer curl",
};

const tricepsPushdown: ExerciseInfo = {
  steps: [
    "Face a high cable, elbows pinned to your sides.",
    "Push the bar/rope down until arms are fully extended.",
    "Squeeze triceps at the bottom.",
    "Let the weight rise back up under control, elbows staying still.",
  ],
  videoQuery: "triceps pushdown",
};

const overheadTricepsExtension: ExerciseInfo = {
  steps: [
    "Hold a dumbbell overhead with both hands, arms extended.",
    "Lower it behind your head by bending only at the elbows.",
    "Keep your upper arms still and close to your head.",
    "Extend back up to full lockout.",
  ],
  videoQuery: "overhead triceps extension",
};

const skullCrushers: ExerciseInfo = {
  steps: [
    "Lie on a bench, bar/dumbbells extended over your chest.",
    "Bend only at the elbows, lowering the weight toward your forehead.",
    "Keep upper arms still and vertical.",
    "Extend back up to full lockout.",
  ],
  videoQuery: "skull crushers",
};

const plank: ExerciseInfo = {
  steps: [
    "Forearms and toes on the floor, body in a straight line.",
    "Brace your core and squeeze your glutes.",
    "Don't let your hips sag or pike up.",
    "Hold for the prescribed time, breathing steadily.",
  ],
  videoQuery: "plank exercise",
};

const hangingLegRaises: ExerciseInfo = {
  steps: [
    "Hang from a bar with arms fully extended.",
    "Raise your legs up (knees bent or straight) toward your chest.",
    "Avoid swinging, control the movement with your abs.",
    "Lower with control back to a full hang.",
  ],
  videoQuery: "hanging leg raises",
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
  "Leg Curl": legCurl,
  "Seated Leg Curl": legCurl,
  "Lying Leg Curl": legCurl,
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
