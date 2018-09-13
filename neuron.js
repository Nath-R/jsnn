
/**
 * Neuron
 * Contains a list of weight applying to the links with the previous layer. A method tell if the neuron is activated or not.
 * It may be binary output if there is a threshold, or the sum of all links if no threshold.
 */
 var Neuron = function()
 {
	/** Initializer **/
	
	/**
	 * Init the neuron from a weigh list
	 */
	this.init_weigh = function(weightListLoad)
	{
		weightList = weightListLoad;
	}
	
	/** Attributes **/
	
	/**
	 * List of weight on the link with the previous layer.
	 */
	var weightList;
	 
	/**
	 * Threshold used to tell if the  neuron is activated or not.
	 * If not set, the checking method will return the avg value
	 */
	var threshold = 0; 
	
	/** Methods **/
	
	/**
	 * Set the threshold
	 */
	this.set_threshold = function(newThreshold)
	{
		threshold = newThreshold;
	}
	
	/**
	 * Get the output by doing the sum of the output of the previous level (our input) applying the weigh.
	 * @param input Array of the output of the previous layer
	 */
	this.get_output = function(input)
	{
		if(input.length != weightList.length)
		{ console.log("Mismatch between input("+input.length +") and weight("+weightList.length +") ! "); }
		
		var sum = 0;
		
		for(var i=0; i < input.length; i++)
		{
			sum += input[i]*weightList[i];
		}
		 
		//No threshold set
		if(threshold == 0)
		{ return sum; }
		//Threshold passed, neuron activated
		else if( sum > threshold )
		{ return 1; }
		//Not activated
		else
		{ return 0;	}
	}
 
 }