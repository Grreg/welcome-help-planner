<?php

namespace AppBundle\Controller;

use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Filesystem\Filesystem;
use Symfony\Component\HttpFoundation\File\File;
use Symfony\Component\HttpFoundation\BinaryFileResponse;
use Symfony\Component\HttpFoundation\JsonResponse;


class DefaultController extends Controller
{
    private $mockData = [
        ['id' => 1, 'name' => 'Dummy Organization One', 'slug' => 'dummy-one', 'description' => 'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.', 'logoUrl' => 'https://placehold.it/150x150?text=One', 'address' => 'Teststr. 11, 87654 Bielefeld, Deutschland'],
        ['id' => 2, 'name' => 'Dummy Organization Two', 'slug' => 'dummy-two', 'description' => 'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.', 'logoUrl' => 'https://placehold.it/150x150?text=Two', 'address' => 'Teststr. 11, 87654 Bielefeld, Deutschland'],
    ];

    public function frontendAction(Request $request, $path)
    {
        if(strpos($path, 'assets/') === 0) {
            $assetPath = $this->get('kernel')->getRootDir() . '/../web/' . $path;

            $fs = new FileSystem();
            if (!$fs->exists($assetPath)) {
                throw $this->createNotFoundException();
            }
            else {
                $response = new BinaryFileResponse($assetPath);
                if((new File($assetPath))->getExtension() === 'html') {
                    $response->headers->set('Content-Type', 'text/html');
                }

                return $response;
            }
        }

        return $this->render('AppBundle:Default:index.html.twig');
    }

    public function apiNotFoundAction()
    {
        throw $this->createNotFoundException();
    }

    public function organizationsAction()
    {
        return new JsonResponse($this->mockData);
    }

    public function organizationBySlugAction($slug)
    {
        $filtered = array_filter($this->mockData, function ($organization) use($slug) {
            return $organization['slug'] === $slug;
        });

        if(empty($filtered)) {
            throw $this->createNotFoundException();
        }
        else {
            return new JsonResponse(array_values($filtered)[0]);
        }
    }
}
