using UnityEngine;
using UnityEngine.UI;
using System.Collections;
using System.Threading.Tasks;
using System.IO;

public class UserInterfaceButtons : MonoBehaviour
{
	public float scalingSpeed = 0.1f;
	public float rotationSpeed = 80.0f;
	public float translationSpeed = 40.0f;
    //	public GameObject Model;
	bool repeatScaleUp = false;
	bool repeatScaleDown = false;
	bool repeatRotateLeft = false;
	bool repeatRotateRight = false;
	bool repeatPositionUp = false;
	bool repeatPositionDown = false;
	bool repeatPositionLeft = false;
	bool repeatPositionRight = false;

    // for model anims
    public Canvas canvas;
    public GameObject Model;
	public Animator cellAnim;
    // 8 placepholder button prefabs
    public GameObject buttonPrefab;
    //public GameObject buttonPrefab_2;
    //public GameObject buttonPrefab_3;
    //public GameObject buttonPrefab_4;
    //public GameObject buttonPrefab_5;
    //public GameObject buttonPrefab_6;
    //public GameObject buttonPrefab_7;
    //public GameObject buttonPrefab_8;
    bool animRan = false;
    public float[] dynamicButtonPrefabs;

    void Start()
    {
        // set display off to start with
        //buttonPrefab_1.SetActive(false);
        //buttonPrefab_2.SetActive(false);
        //buttonPrefab_3.SetActive(false);
        //buttonPrefab_4.SetActive(false);
        //buttonPrefab_5.SetActive(false);
        //buttonPrefab_6.SetActive(false);
        //buttonPrefab_7.SetActive(false);
        //buttonPrefab_8.SetActive(false);



        //Text temp = buttonPrefab_1.GetComponentInChildren<Text>();
        //temp.text = "MITOCHONDRIA";

        //ReadConfigFile(requiredNuberOfPrefabs);
    }

    void Update ()
    {
     


        if (repeatScaleUp) {
			ScaleUpButton ();
		}

		if (repeatScaleDown) {
			ScaleDownButton ();
		}

		if (repeatRotateRight) {
			RotationRightButton();
		}

		if (repeatRotateLeft) {
			RotationLeftButton();
		}

		if (repeatPositionUp) {
			PositionUpButton();
		}

		if (repeatPositionDown) {
			PositionDownButton();
		}

		if (repeatPositionLeft) {
			PositionLeftButton();
		}

		if (repeatPositionRight) {
			PositionRightButton();
		}
    }

    public void ShowMenu() 
    {
        Debug.Log("ShowMenu"); 
    }
    public void CloseAppButton ()
	{
		Application.Quit ();
	}

	public void RotationRightButton ()
	{
		// transform.Rotate (0, -rotationSpeed * Time.deltaTime, 0);
		Model.transform.Rotate (0, -rotationSpeed * Time.deltaTime, 0);
	}

	public void RotationLeftButton ()
	{
        // transform.Rotate (0, rotationSpeed * Time.deltaTime, 0);
        Model.transform.Rotate (0, rotationSpeed * Time.deltaTime, 0);
	}

	public void RotationRightButtonRepeat ()
	{
		// transform.Rotate (0, -rotationSpeed * Time.deltaTime, 0);
		repeatRotateRight=true;
	}
	
	public void RotationLeftButtonRepeat ()
	{
		// transform.Rotate (0, rotationSpeed * Time.deltaTime, 0);
		repeatRotateLeft=true;
	}

	public void ScaleUpButton ()
	{
        // transform.localScale += new Vector3(scalingSpeed, scalingSpeed, scalingSpeed);
        Model.transform.localScale += new Vector3 (scalingSpeed, scalingSpeed, scalingSpeed);
    }

	public void ScaleUpButtonRepeat ()
	{
		repeatScaleUp = true;
		Debug.Log ("Up");
	}
	
    public void ScaleDownButtonRepeat ()
	{
		repeatScaleDown = true;
		Debug.Log ("Down");
	}
	
    public void PositionDownButtonRepeat ()
	{
		repeatPositionDown = true;
	}
	
    public void PositionUpButtonRepeat ()
	{
		repeatPositionUp = true;
	}
	
    public void PositionLeftButtonRepeat ()
	{
		repeatPositionLeft = true;
	}
	
    public void PositionRightButtonRepeat ()
	{
		repeatPositionRight = true;
	}
	
	public void ScaleUpButtonOff ()
	{
		repeatScaleUp = false;
		Debug.Log ("Off");
	}
	
    public void ScaleDownButtonOff ()
	{
		repeatScaleDown = false;
		Debug.Log ("Off");
	}

	public void RotateLeftButtonOff ()
	{
		repeatRotateLeft = false;
		Debug.Log ("Off");
	}

	public void RotateRightButtonOff ()
	{
		repeatRotateRight = false;
		Debug.Log ("Off");
	}
	
    public void PositionRightButtonOff ()
	{
		repeatPositionRight = false;
		Debug.Log ("Off");
	}
	
    public void PositionLeftButtonOff ()
	{
		repeatPositionLeft = false;
		Debug.Log ("Off");
	}
	
    public void PositionUpButtonOff ()
	{
		repeatPositionUp = false;
		Debug.Log ("Off");
	}
	
    public void PositionDownButtonOff ()
	{
		repeatPositionDown = false;
		Debug.Log ("Off");
	}
	
	public void ScaleDownButton ()
	{
        // transform.localScale += new Vector3(-scalingSpeed, -scalingSpeed, -scalingSpeed);
        Model.transform.localScale += new Vector3 (-scalingSpeed, -scalingSpeed, -scalingSpeed);
	}

	public void PositionUpButton ()
	{
        Model.transform.Translate (0, 0, -translationSpeed * Time.deltaTime);
	}

	public void PositionDownButton ()
	{

        Model.transform.Translate (0, 0, translationSpeed * Time.deltaTime);
	}

	public void PositionRightButton ()
	{
        Model.transform.Translate (-translationSpeed * Time.deltaTime, 0, 0);
	}

	public void PositionLeftButton ()
	{
        Model.transform.Translate (translationSpeed * Time.deltaTime, 0, 0);  // backward
	}

	public void ChangeScene (string a)
	{
		Application.LoadLevel (a);
	}

	public void AnyButton ()
	{
		Debug.Log ("Any");
	}

	public void PlayAnim (string animName)
	{
        Debug.Log("Aimation: " + animName.ToString());
        if (animRan == false)
        {
            // for the initial run
            cellAnim = Model.GetComponent<Animator>();
            cellAnim.Play(animName);
            animRan = true;
        }
        else if (animName == "explode")
        {
            // for the explode animation second run
            cellAnim = Model.GetComponent<Animator>();
            cellAnim.Play(animName.ToString() + "_reverse");
            // reset the anim
            animRan = false;
        } else 
        {
            // for the other animations second run
            cellAnim = Model.GetComponent<Animator>();
            cellAnim.Play("Idle");
            // reset the anim
            animRan = false;
        }
    }

    public void ReadConfigFile()
    {
        // instantiate the model animations using the config file
        //Instantiate(buttonPrefab, );
        //Debug.Log(buttonPrefab);
        //buttonPrefab.transform.localPosition = new Vector2(-95,121);
        //GameObject textInstance = Instantiate(buttonPrefab, transform.position, transform.rotation) as GameObject;
        //textInstance.transform.SetParent(canvas.transform, false);
        //Button buttonPrefabButtonComponent = buttonPrefab.GetComponent<Button>();
        //buttonPrefabButtonComponent.onClick.AddListener(() => MyButtonDelegate("Nucleus"));

        // based on how many prefabs are need for the ui buttons, enable the correct number
        //Debug.Log("Required Number of prefabs:" + numberOfPrefabsRequired.ToString());
        buttonPrefab.GetComponent<Button>().onClick.AddListener(delegate { MyButtonDelegate("Mitochondria"); });

        Text a = buttonPrefab.transform.GetChild(0).GetComponent<Text>();
        a.text = "WORKS";
        // get the number of required prefabs
        int requiredNuberOfPrefabs = MainUIHandler.reuqiredNumberOfPrefabs;

    }

    public void MyButtonDelegate(string animName)
    {
        // play anim
        Debug.Log("RENDEREDBUTTON: Clicked");
        PlayAnim(animName);
    }

   
}   
