<?php

namespace AppBundle\Entity;

/**
 * Organisation
 */
class Organisation
{
    /**
     * @var int
     */
    private $id;

    /**
     * @var string
     */
    private $string;

    /**
     * @var string
     */
    private $name;

    /**
     * @var float
     */
    private $address;

    /**
     * @var float
     */
    private $geoLat;

    /**
     * @var string
     */
    private $geoLng;

    /**
     * @var string
     */
    private $logo;

    /**
     * @var string
     */
    private $description;


    /**
     * Get id
     *
     * @return int
     */
    public function getId()
    {
        return $this->id;
    }

    /**
     * Set string
     *
     * @param string $string
     *
     * @return Organisation
     */
    public function setString($string)
    {
        $this->string = $string;

        return $this;
    }

    /**
     * Get string
     *
     * @return string
     */
    public function getString()
    {
        return $this->string;
    }

    /**
     * Set name
     *
     * @param string $name
     *
     * @return Organisation
     */
    public function setName($name)
    {
        $this->name = $name;

        return $this;
    }

    /**
     * Get name
     *
     * @return string
     */
    public function getName()
    {
        return $this->name;
    }

    /**
     * Set address
     *
     * @param float $address
     *
     * @return Organisation
     */
    public function setAddress($address)
    {
        $this->address = $address;

        return $this;
    }

    /**
     * Get address
     *
     * @return float
     */
    public function getAddress()
    {
        return $this->address;
    }

    /**
     * Set geoLat
     *
     * @param float $geoLat
     *
     * @return Organisation
     */
    public function setGeoLat($geoLat)
    {
        $this->geoLat = $geoLat;

        return $this;
    }

    /**
     * Get geoLat
     *
     * @return float
     */
    public function getGeoLat()
    {
        return $this->geoLat;
    }

    /**
     * Set geoLng
     *
     * @param string $geoLng
     *
     * @return Organisation
     */
    public function setGeoLng($geoLng)
    {
        $this->geoLng = $geoLng;

        return $this;
    }

    /**
     * Get geoLng
     *
     * @return string
     */
    public function getGeoLng()
    {
        return $this->geoLng;
    }

    /**
     * Set logo
     *
     * @param string $logo
     *
     * @return Organisation
     */
    public function setLogo($logo)
    {
        $this->logo = $logo;

        return $this;
    }

    /**
     * Get logo
     *
     * @return string
     */
    public function getLogo()
    {
        return $this->logo;
    }

    /**
     * Set description
     *
     * @param string $description
     *
     * @return Organisation
     */
    public function setDescription($description)
    {
        $this->description = $description;

        return $this;
    }

    /**
     * Get description
     *
     * @return string
     */
    public function getDescription()
    {
        return $this->description;
    }
    /**
     * @var float
     */
    private $getLat;

    /**
     * @var \Doctrine\Common\Collections\Collection
     */
    private $locations;

    /**
     * Constructor
     */
    public function __construct()
    {
        $this->locations = new \Doctrine\Common\Collections\ArrayCollection();
    }

    /**
     * Set getLat
     *
     * @param float $getLat
     *
     * @return Organisation
     */
    public function setGetLat($getLat)
    {
        $this->getLat = $getLat;

        return $this;
    }

    /**
     * Get getLat
     *
     * @return float
     */
    public function getGetLat()
    {
        return $this->getLat;
    }

    /**
     * Add location
     *
     * @param \AppBundle\Entity\Location $location
     *
     * @return Organisation
     */
    public function addLocation(\AppBundle\Entity\Location $location)
    {
        $this->locations[] = $location;

        return $this;
    }

    /**
     * Remove location
     *
     * @param \AppBundle\Entity\Location $location
     */
    public function removeLocation(\AppBundle\Entity\Location $location)
    {
        $this->locations->removeElement($location);
    }

    /**
     * Get locations
     *
     * @return \Doctrine\Common\Collections\Collection
     */
    public function getLocations()
    {
        return $this->locations;
    }
}
